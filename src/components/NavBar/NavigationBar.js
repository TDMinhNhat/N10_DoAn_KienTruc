import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../../src/asset/IUH.png';
import { Dropdown } from 'react-bootstrap';
import './NavigationBar.css';

const NavigationBar = ({ isLoggedIn, onLogout, currentUser }) => {
    const location = useLocation();

    const handleLogoutClick = (e) => {
        e.preventDefault();
        onLogout();
    };

    if (location.pathname === '/' || location.pathname === '/register') {
        return null;
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm justify-content-center">
            <div className="container">
                <Link className="navbar-brand" to="/dashboard">
                    <img
                        src={logo}
                        alt="Brand Logo"
                        style={{ maxHeight: '30px', width: '100px' }}
                    />
                </Link>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul className="navbar-nav">
                        {isLoggedIn && <li className="nav-item"><Link className="nav-link" to="/dashboard">Home</Link></li>}
                        {isLoggedIn && (
                            <Dropdown>
                                <Dropdown.Toggle variant="null" id="dropdown-basic">
                                    <img
                                        src={currentUser.data.person.avatar}
                                        alt="Avatar"
                                        style={{ width: '30px', height: '30px', borderRadius: '50%', marginRight: '5px' }}
                                    />
                                    {currentUser.data.person.fullName}
                                </Dropdown.Toggle>

                                <Dropdown.Menu className="dropdown-menu" style={{ width: '100%', backgroundColor: '#F8F9FA', border: 'none', padding: 0 }}>
                                    <Dropdown.Item as={Link} to="/profile">Thông tin cá nhân</Dropdown.Item>
                                    <Dropdown.Item as={Link} to="/change-password">Đổi mật khẩu</Dropdown.Item>
                                    <Dropdown.Item as={Link} to="/logout" onClick={handleLogoutClick}>Đăng xuất</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavigationBar;