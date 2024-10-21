FROM node:22
WORKDIR /PDF2Quiz
COPY . .

RUN pip install requirements.txt
RUN npm install
RUN 
