import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Hook for navigation

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add authentication logic here (e.g., API call)
        console.log('Sign-In Details:', { email, password });

        // Navigate to the PDFUpload page after a successful sign-in
        navigate('/main');
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h1 style={styles.logo}>PDF2Quiz</h1>
                <h2 style={styles.title}>Create new account</h2>
                
                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.inputGroup}>
                        <input
                            type="text"
                            placeholder="Name"
                            required
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.inputGroup}>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.inputGroup}>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={styles.input}
                        />
                    </div>
                    <button type="submit" style={styles.button}>Sign Up</button>
                </form>
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        padding: '2rem',
    },
    card: {
        borderRadius: '10px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        padding: '5.5rem',
        maxWidth: '600px',
        width: '100%',
        textAlign: 'center',
        backgroundColor: '#FFD580', 
    },
    logo: {
        fontSize: '2rem',
        fontWeight: 'bold',
        color: '#FFFFFF', // White color for "PDF2Quiz"
        marginBottom: '1rem',
    },
    title: {
        marginBottom: '1.5rem',
        fontSize: '1.4rem',
        fontWeight: '600',
        color: '#333',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: '1.5rem',
    },
    inputGroup: {
        marginBottom: '1rem',
    },
    input: {
        width: '100%',
        padding: '0.75rem',
        fontSize: '1rem',
        borderRadius: '4px',
        border: '1px solid #ccc',
        outline: 'none',
    },
    button: {
        padding: '0.75rem',
        fontSize: '1rem',
        backgroundColor: '#000000', // Black background for buttons
        color: '#FFFFFF', // White text for buttons
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontWeight: '600',
        marginTop: '1rem',
    },
    footerText: {
        fontSize: '0.9rem',
        color: '#666',
    },
    link: {
        color: '#e3342f',
        textDecoration: 'none',
        fontWeight: '600',
    },
    termsText: {
        fontSize: '0.75rem',
        color: '#999',
        marginTop: '1rem',
    },
};

export default SignIn;