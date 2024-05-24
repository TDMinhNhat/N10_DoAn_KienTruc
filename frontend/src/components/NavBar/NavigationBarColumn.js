// import React from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { Navbar, Nav } from 'react-bootstrap';

// const NavigationBar = () => {
//     const location = useLocation();

//     if (location.pathname === '/' || location.pathname === '/register') {
//         return null;
//     }

//     return (
//         <Navbar bg="light" expand="lg" className="flex-column">
//             <Navbar.Toggle aria-controls="basic-navbar-nav" />
//             <Navbar.Collapse id="basic-navbar-nav">
//                 <Nav className="mr-auto flex-column">
//                     <Nav.Link as={Link} to="/dashboard">TRANG CHỦ</Nav.Link>
//                     <Nav.Link as={Link} to="/profile">THÔNG TIN CHUNG</Nav.Link>
//                     <Nav.Link as={Link} to="/study">HỌC TẬP</Nav.Link>
//                     <Nav.Link as={Link} to="/register-course">ĐĂNG KÝ HỌC PHẦN</Nav.Link>
//                 </Nav>
//             </Navbar.Collapse>
//         </Navbar>
//     );
// };

// export default NavigationBar;