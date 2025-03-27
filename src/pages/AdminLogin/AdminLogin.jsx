import React, { useState } from 'react';
import './AdminLogin.css';
import { useNavigate } from 'react-router-dom';
import bikeImage from "../../assets/bike.png";
import { FaGoogle, FaGithub, FaFacebook } from "react-icons/fa";
import axios from 'axios';

const AdminLogin = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        try {

            const response = await axios.post('http://localhost:8080/api/user/login', {
                email,
                password
            });


            if (response.data && response.data.token) {

                localStorage.setItem('adminToken', response.data.token);
                navigate('/admin');
            } else {
                setError('Invalid email or password');
            }
        } catch (err) {
            console.error(err);
            setError('An error occurred while logging in. Please try again.');
        }
    };

    return (
        <div className="admin-login-page">
            <div className="overlay"></div>
            <div className="login-card">
                <div className="login-form">
                    <h2>Admin Login</h2>

                    {/* Display error if any */}
                    {error && <Alert variant="danger">{error}</Alert>}

                    <label>Email</label>
                    <input
                        type="email"
                        placeholder="admin@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <label>Password</label>
                    <input
                        type="password"
                        placeholder="********"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button className="btn-signin" onClick={handleLogin}>Sign In</button>

                    <div className="continue">Or Continue With</div>
                    <div className="social-icons">
                        <div className="social-btn google"><FaGoogle /></div>
                        <div className="social-btn github"><FaGithub /></div>
                        <div className="social-btn facebook"><FaFacebook /></div>
                    </div>

                    <p className="forgot" onClick={() => navigate('/forgot')}>Forgot Password?</p>
                </div>

                <div className="login-image">
                    <img src={bikeImage} alt="Bicycle" />
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
