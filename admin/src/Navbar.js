import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { FaBars } from 'react-icons/fa6';
import { ImCross } from 'react-icons/im';

export default function Navbar({ isAuthenticated, onLogout }) {
    const [Mobile, setMobile] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        onLogout();
        navigate('/')
    };

    return (
        <nav className="navbar">
            <h3 className="logo">Restaurant</h3>
            <ul className={Mobile ? "links-mobile" : "links"} onClick={() => setMobile(false)}>
                <Link to='/test'><li>Home</li></Link>
                <Link to='/Corbeille'><li>Corbeille</li></Link>
                {isAuthenticated ? (
                    
                    <li onClick={handleLogout}>Log-out</li>
                ) : (
                    <Link to='/'><li>Log-in</li></Link>
                )}
            </ul>
            <button className="menu" onClick={() => setMobile(!Mobile)}>
                {Mobile ? <ImCross /> : <FaBars />}
            </button>
        </nav>
    )
}