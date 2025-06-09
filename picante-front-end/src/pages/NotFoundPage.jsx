import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NotFoundPage.css';

function NotFoundPage() {
    return (
        <div className="not-found-wrapper">
            <div className="not-found-card">
                <h1 className="error-code">404</h1>
                <p className="error-message">Oops! We couldn't find the page you're looking for.</p>
                <p className="error-subtext">It might have been moved or never existed.</p>
                <Link to="/" className="back-home-btn">Take Me Home</Link>
            </div>
        </div>
    );
}

export default NotFoundPage;
