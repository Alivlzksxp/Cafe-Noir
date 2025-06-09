import React from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/LoginReg.css'; 

const WelcomePage = () => {
    const location = useLocation();
    const { email, name } = location.state || {};  

    return (
        <div className="lr-container">
            <div className="lr-box">
                <h2>Welcome to Café Noir!</h2>
                {email ? (
                    <p className="lr-switch">
                        We're glad to have you back, <strong>{name}</strong>! 
                    </p>
                ) : (
                    <p className="lr-switch">
                        Please login to get started.
                    </p>
                )}
            </div>
        </div>
    );
};

export default WelcomePage;
