import React, { useState } from 'react';
import './register.css';

export default function Register() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [validUsername, setValidUsername] = useState(true);
    const [validPassword, setValidPassword] = useState(true);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));

        if (name === 'username') {
            setValidUsername(!value.includes(' ')); // No spaces allowed in username
        }

        if (name === 'password') {
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{6,}$/;
            setValidPassword(passwordRegex.test(value));
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setError(null);
        setSuccess(null);

        if (!validUsername || !validPassword) {
            setError('Please fix the errors above.');
            return;
        }

        const dataToSend = {
            name: formData.username, 
            email: formData.email,
            password: formData.password
        };

        fetch(`${process.env.REACT_APP_BACKEND_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('An account with this email already exists or there was an error creating the account.');
            }
            return response.text();
        })
        .then(data => {
            setSuccess('Registration successful. Please log in!');
        })
        .catch(error => {
            setError(error.message);
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Register</h1>
            <label>
                Username:
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleInputChange} 
                    className={!validUsername ? 'input-error' : ''}
                />
            </label>
            <label>
                Email:
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                />
            </label>
            <label>
                Password:
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={!validPassword ? 'input-error' : ''}
                />
            </label>
            
            <div className="verification-messages">
                {!validUsername && <p className="verification-message">Username cannot contain spaces.</p>}
                {!validPassword && <p className="verification-message">Password must include uppercase, lowercase, a digit, and a special character.</p>}
                {error && <p className="verification-message">{error}</p>}
                {success && <p className="verification-message success">{success}</p>}
            </div>

            <button type="submit">Submit</button>
        </form>
    );
}
