import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { loginUser } from '../services/UserService';
import '../styles/LoginReg.css';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
    e.preventDefault();
    try {
        const { data } = await loginUser({ email, password });
        console.log('Login successful:', data);

        localStorage.setItem('token', data.token);
        localStorage.setItem('type', data.type);

        localStorage.setItem('registeredUser', JSON.stringify({
            username: data.firstName,
            type: data.type,
            token: data.token
        }));

        if (data.type === 'viewer') {
            navigate('/');
        } else {
            navigate('/dashboard', { state: { firstName: data.firstName, type: data.type } });
        }
    } catch (err) {
        console.error('Login failed:', err.response?.data?.message || err.message);
        setError(err.response?.data?.message || 'Login failed. Please try again.');
    }
};

    return (
        <div className="lr-container">
            <div className="lr-box">
                <h2>Welcome Back!</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <form onSubmit={handleLogin}>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <Button type="submit">Login</Button>
                </form>
                <p className="lr-switch">
                    Don't have an account? <Link to="/register">Register here</Link>
                </p>
            </div>
        </div>
    );
}

export default LoginPage;
