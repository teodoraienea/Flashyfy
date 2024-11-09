import React, { useState } from 'react';
import './login.css'; 

export default function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState(null);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        
        // Clear previous error
        setError(null);
        
        // Send login data to backend
        fetch(`${process.env.REACT_APP_BACKEND_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('No account found with the provided credentials.');
            }
            return response.text();
        })
        .then(data => {
            console.log('Login successful:', data); 
            // Redirect or perform other login success actions here
        })
        .catch(error => {
            setError(error.message);
            console.error('Login error:', error.message);
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Log in</h1>
            <label>
                Email:
                <br />
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
                <br />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                />
            </label>
            <br />
            <button type="submit">Submit</button>
            {error && <p className="text" style={{ color: 'red' }}>{error}</p>}
            <p className='text'>Don't have an account yet?</p>
            <a className="text" href="/register">Register</a>
        </form>
    );
}
