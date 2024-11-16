import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './signin.css';

function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const users = [
        { name: 'Aryan Khatri', email: 'khatriaryan791@gmail.com', password: '123456' },
        { name: 'Shashank', email: 'shashank@google.com', password: '123' },
        { name: 'Sir', email: 'sir@google.com', password: '12345' },
        { name: 'Niko', email: 'niko@google.com', password: '09876' },
        { name: 'Chahat', email: 'chahat@example.com', password: '098765' },
    ];

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!emailRegex.test(email)) {
            setErrorMessage(
                <span style={{ fontFamily: 'LightFont', fontSize: '16px' }}>
                    The email format is invalid. Please enter a valid email.
                </span>
            );
            return;
        }

        const user = users.find((user) => user.email === email);

        if (!user) {
            setErrorMessage(
                <span style={{ fontFamily: 'LightFont', fontSize: '17px' }}>
                    The email is not registered. Please register your email.
                </span>
            );
        } else if (user.password !== password) {
            setErrorMessage(
                <span style={{ fontFamily: 'LightFont', fontSize: '17px' }}>
                    The password is incorrect. Please check your password.
                </span>
            );
        } else {
            setErrorMessage('');
            console.log('Sign-In Successful:', user);
            navigate('/main');
        }
    };

    return (
        <div className="container">
            <div className="logoText">
                PDF<span style={{ color: '#000000', fontSize: '50px' }}>2</span>Quiz
            </div>
            <div className="card">
                <h2 className="title">Sign In</h2>
                <form onSubmit={handleSubmit} className="form">
                    <div className="inputGroup">
                        <label htmlFor="email" className="label">
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Username@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="input"
                        />
                    </div>
                    <div className="inputGroup">
                        <label htmlFor="password" className="label">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            placeholder="············"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="input"
                        />
                    </div>
                    {errorMessage && <p className="error">{errorMessage}</p>}
                    <button type="submit" className="button">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default SignIn;
