import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-top">
                <p>Experience the warmth of Filipino hospitality at Café Noir</p>
                </div>
                <nav className="footer-links">
                    <Link to="/">Home</Link>
                    <Link to="/about">About Us</Link>
                    <Link to="/articles">Articles</Link>
                    <Link to="/contact">Contact Us</Link>
                </nav>

                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} Cozy Cafe. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
