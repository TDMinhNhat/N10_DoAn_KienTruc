import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import './NavBarColumn.css';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { Navbar, Nav } from 'react-bootstrap';

const NavBarColumn = () => {
    const location = useLocation();
    const [isNavbarVisible, setNavbarVisible] = useState(false);
    const [isGeneralInfoExpanded, setGeneralInfoExpanded] = useState(false);
    const [isStudyExpanded, setStudyExpanded] = useState(false);

    const toggleNavbar = () => {
        setNavbarVisible(!isNavbarVisible);
    };

    const toggleGeneralInfo = () => {
        setGeneralInfoExpanded(!isGeneralInfoExpanded);
    };

    const toggleStudy = () => {
        setStudyExpanded(!isStudyExpanded);
    };

    if (location.pathname === '/' || location.pathname === '/register') {
        return null;
    }
    return (
        <div className="content">
            <div className="navbar-container" style={{ left: `${isNavbarVisible ? '0' : '-200px'}` }}>
                <Navbar bg="light" expand="lg" className="flex-column">
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto flex-column">
                            <Nav.Link as={Link} to="/dashboard">TRANG CHỦ</Nav.Link>
                            <Nav.Link onClick={toggleGeneralInfo}>
                                THÔNG TIN CHUNG {isGeneralInfoExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                            </Nav.Link>
                            {isGeneralInfoExpanded && (
                                <>
                                    <Nav.Link as={Link} to="/profile">Thông tin sinh viên</Nav.Link>
                                    <Nav.Link as={Link} to="/update-suggestion">Cập nhật thông tin</Nav.Link>
                                </>
                            )}
                            <Nav.Link onClick={toggleStudy}>
                                HỌC TẬP {isStudyExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                            </Nav.Link>
                            {isStudyExpanded && (
                                <>
                                    <Nav.Link as={Link} to="/study-results">Kết quả học tập</Nav.Link>
                                    <Nav.Link as={Link} to="/weekly-schedule">Lịch học theo tuần</Nav.Link>
                                </>
                            )}
                            <Nav.Link as={Link} to="/register-course">ĐĂNG KÝ HỌC PHẦN</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <button
                    className={`toggle-button ${isNavbarVisible ? 'close' : 'open'}`}
                    style={{ left: `${isNavbarVisible ? '200px' : '0'}` }}
                    onClick={toggleNavbar}
                >
                    <MenuOpenIcon />
                </button>
            </div>
        </div>
    );
};

export default NavBarColumn;