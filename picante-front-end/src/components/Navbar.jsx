import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';
import logo from '../assets/cafeLogo.png';
import { ShoppingCart } from 'lucide-react';

function Navbar() {
    const [user, setUser] = useState(null);
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('registeredUser'));
    if (storedUser) {
        setUser(storedUser);
    }
}, []);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
    localStorage.removeItem('registeredUser');
    setUser(null);
    navigate('/login');
};

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="navbar-left">
                <img src={logo} alt="Logo" className="navbar-logo" />
            </div>
            <ul className="nav-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/articles">Articles</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
            </ul>
            <div className="navbar-right">
                {!user ? (
                    <div className="auth-container">
                        <div className="auth-links">
                            <Link to="/login">Login</Link>
                            <span>|</span>
                            <Link to="/register">Register</Link>
                        </div>
                        <button className="shop-icon-button">
                            <ShoppingCart className="shop-icon" />
                        </button>
                    </div>
                ) : (
                    <div className="auth-loggedin">
                        <span className="navbar-username">Hello, {user.username}!</span>
                        <button className="custom-button" onClick={handleLogout}>Logout</button>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
