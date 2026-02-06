import React, { useState } from 'react';
import { Container, Form, Button, Alert, Card } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setToken, setUser } from '../redux/authSlice';
import { authAPI } from '../services/api';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setErr] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignup = async (e) => {
    e.preventDefault();
    setErr('');
    setLoading(true);

    try {
      const response = await authAPI.register({
        email,
        username,
        password,
        confirmPassword
      });
      dispatch(setToken(response.data.token));
      dispatch(setUser(response.data.user));
      navigate('/');
    } catch (error) {
      setErr(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5">
      <div style={{ maxWidth: '400px', margin: '0 auto' }}>
        <Card className="border-0 shadow-sm">
          <Card.Body className="p-5">
            <h2 className="mb-4 text-center" style={{ color: '#667eea' }}>Sign Up</h2>

            {error && <Alert variant="danger" className="error-alert">{error}</Alert>}

            <Form onSubmit={handleSignup}>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Choose username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Button
                type="submit"
                className="btn-primary-custom w-100 mb-3"
                disabled={loading}
              >
                {loading ? 'Signing up...' : 'Sign Up'}
              </Button>
            </Form>

            <p className="text-center text-muted">
              Already have an account?{' '}
              <Link to="/login" className="text-decoration-none" style={{ color: '#667eea' }}>
                Login here
              </Link>
            </p>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
}
