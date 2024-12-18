import os
import json
import subprocess
from dotenv import load_dotenv
from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_openai.embeddings import OpenAIEmbeddings
from langchain_community.vectorstores import Chroma
from langchain_openai import ChatOpenAI
from langchain.chains import RetrievalQA

# Load environment variables
load_dotenv()
os.environ['OPENAI_API_KEY'] = os.getenv('OPENAI_API_KEY')

# Define paths
current_dir = os.path.dirname(os.path.abspath(__file__))
format_json_path = os.path.join(current_dir, 'formatJSON.py')
folder_path = os.path.join(current_dir, 'uploads')
project_root = os.path.abspath(os.path.join(current_dir, '..'))
store_path = os.path.join(project_root, 'Frontend', 'src', 'response')
response_json_path = os.path.join(store_path, 'response.txt')

# Check for PDF files
files = os.listdir(folder_path)
pdf_files = [file for file in files if file.lower().endswith('.pdf')]
if pdf_files:
    first_pdf_path = os.path.join(folder_path, pdf_files[0])
    print("The path of the first PDF file is:", first_pdf_path)
else:
    print("No PDF files found in the folder.")
    exit()

# Load and process the PDF content
def getTextFromPDF() -> str:
    loader = PyPDFLoader(first_pdf_path)
    documents = loader.load()
    print("Number of documents found in the PDF:", len(documents))
    return documents

# Process documents
documents = getTextFromPDF()
text_splitter = RecursiveCharacterTextSplitter(chunk_size=200, chunk_overlap=100)
texts = text_splitter.split_documents(documents)
print("Number of text chunks after splitting:", len(texts))

# Create embeddings and vector store
embeddings = OpenAIEmbeddings()
store = Chroma.from_documents(texts, embeddings, collection_name="Quiz-PDF")
print("Vector store created successfully.")

# Set up the language model and chain
llm = ChatOpenAI(temperature=0.8, model="gpt-4-turbo")
chain = RetrievalQA.from_chain_type(llm, retriever=store.as_retriever())

# Prompt to generate MCQs
prompt = """
You are tasked with creating multiple-choice questions (MCQs) from the text provided in the document. Generate exactly 5 MCQs in a **strict JSON format**. Each MCQ should follow this JSON structure:

{
  "question_id": <unique integer>,
  "question_text": "<question related to the document content>",
  "options": [
    {"option_id": 1, "text": "<option 1 text>"},
    {"option_id": 2, "text": "<option 2 text>"},
    {"option_id": 3, "text": "<option 3 text>"},
    {"option_id": 4, "text": "<option 4 text>"}
  ],
  "correct_option_id": <integer corresponding to the correct answer>
}

**Requirements**:
- Use only this format for each MCQ object, and strictly follow JSON rules.
- Do **not** include any text outside the JSON structure.
- Output all JSON objects in a single JSON array, in one line, without any additional comments or explanations.
- Ensure the output is syntactically valid JSON.

**Example**:
[
  {
    "question_id": 1,
    "question_text": "What is the capital city of Australia?",
    "options": [
      {"option_id": 1, "text": "Sydney"},
      {"option_id": 2, "text": "Melbourne"},
      {"option_id": 3, "text": "Canberra"},
      {"option_id": 4, "text": "Brisbane"}
    ],
    "correct_option_id": 3
  },
  {
    "question_id": 2,
    "question_text": "Which planet in our solar system is known as the 'Red Planet'?",
    "options": [
      {"option_id": 1, "text": "Venus"},
      {"option_id": 2, "text": "Mars"},
      {"option_id": 3, "text": "Jupiter"},
      {"option_id": 4, "text": "Saturn"}
    ],
    "correct_option_id": 2
  }
]

Please generate the MCQs based on the document content and respond **only** with valid JSON, without additional commentary.
"""


response = chain.invoke(prompt)
print(response)
with open(response_json_path, 'w') as json_file:
    json.dump(response, json_file, indent=4)

os.remove(first_pdf_path)
subprocess.run(['python3', format_json_path])
