import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Navbar from './screens/Navbar';
import MainContent from './screens/MainContent';
import PDFUpload from './screens/PDFUpload';
import UploadButton from './components/UploadButton';
import About from './screens/About';
import Contact from './screens/Contact';
import Quiz from './screens/Quiz';
import LoadingPage from './screens/LoadingPage';
import ErrorPage from './screens/ErrorPage';
import SignIn from './screens/SignIn'; 

import './index.css';

function App() {
  const [file, setFile] = useState(null);

  const handleFileAccepted = (file) => {
    setFile(file);
  };

  const handleUpload = () => {
    if (file) {
      console.log('Uploading file:', file);
    } else {
      alert('Please select a file first!');
    }
  };

  return (
    <Router>
      <ContentWithNavbar file={file} onFileAccepted={handleFileAccepted} onUpload={handleUpload} />
    </Router>
  );
}

function ContentWithNavbar({ file, onFileAccepted, onUpload }) {
  const location = useLocation();
  const shouldShowNavbar = location.pathname !== '/signin';

  return (
    <div style={styles.app}>
      {shouldShowNavbar && <Navbar />}
      <main style={styles.main}>
        <Routes>
          {/* Redirect the root path to the sign-in page */}
          <Route path="/" element={<Navigate to="/signin" />} />
          <Route path="/signin" element={<SignIn />} />
          <Route
            path="/main"
            element={
              <div style={styles.contentContainer}>
                <MainContent />
                <PDFUpload onFileAccepted={onFileAccepted} />
                <UploadButton onClick={onUpload} />
              </div>
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/loading" element={<LoadingPage />} />
          <Route path="/error" element={<ErrorPage />} />
          {/* Redirect unknown paths to the sign-in page */}
          <Route path="*" element={<Navigate to="/signin" />} />
        </Routes>
      </main>
      
    </div>
  );
}

const styles = {
  app: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  main: {
    flex: '1',
    display: 'flex',
    justifyContent: 'center',
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
};

export default App;