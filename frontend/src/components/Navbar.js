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
        <BootstrapNavbar.Brand as={Link} to="/" className="fw-bold" style={{ color: '#667eea' }}>
          🏡 WanderLust
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            
            {token ? (
              <>
                <Nav.Link as={Link} to="/listings/new" className="me-2">
                  <Button size="sm" className="btn-primary-custom">+ New Listing</Button>
                </Nav.Link>
                <Nav.Link as={Link} to="/my-listings">My Listings</Nav.Link>
                <Nav.Link as={Link} to={`/profile/${user?.id}`}>{user?.username || 'Profile'}</Nav.Link>
                <Nav.Link onClick={handleLogout} style={{ cursor: 'pointer' }}>Logout</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  <Button size="sm" className="btn-primary-custom">Sign Up</Button>
                </Nav.Link>
              </>
            )}
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
}
