import React from 'react';
import { Navbar as BootstrapNavbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';

export default function Navbar() {
  const { token, user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <BootstrapNavbar bg="white" expand="lg" className="navbar-custom sticky-top">
      <Container>
        <BootstrapNavbar.Brand as={Link} to="/" className="fw-bold navbar-brand">
          🏡 WanderLust
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link as={Link} to="/" className="mx-2">Home</Nav.Link>
            <Nav.Link as={Link} to="/" className="mx-2">All Listings</Nav.Link>
            
            {token ? (
              <>
                <Nav.Link as={Link} to="/listings/new" className="mx-2">
                  <Button size="sm" className="btn-primary-custom">Add New Listing</Button>
                </Nav.Link>
                <Nav.Link as={Link} to="/my-listings" className="mx-2">My Listings</Nav.Link>
                <Nav.Link onClick={handleLogout} style={{ cursor: 'pointer' }} className="mx-2">
                  <Button size="sm" variant="outline-dark">Logout</Button>
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/signup" className="mx-2">
                  <Button size="sm" className="btn-primary-custom">Sign Up</Button>
                </Nav.Link>
                <Nav.Link as={Link} to="/login" className="mx-2">
                  <Button size="sm" variant="outline-dark">Log In</Button>
                </Nav.Link>
              </>
            )}
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
}
