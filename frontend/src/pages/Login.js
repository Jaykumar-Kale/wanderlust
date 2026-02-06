import React, { useState } from 'react';
import { Container, Form, Button, Alert, Card } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setToken, setUser, setError, clearError } from '../redux/authSlice';
import { authAPI } from '../services/api';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setErr] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErr('');
    setLoading(true);

    try {
      const response = await authAPI.login({ username, password });
      dispatch(setToken(response.data.token));
      dispatch(setUser(response.data.user));
      navigate('/');
    } catch (error) {
      setErr(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5">
      <div style={{ maxWidth: '400px', margin: '0 auto' }}>
        <Card className="border-0 shadow-sm">
          <Card.Body className="p-5">
            <h2 className="mb-4 text-center" style={{ color: '#667eea' }}>Login</h2>

            {error && <Alert variant="danger" className="error-alert">{error}</Alert>}

            <Form onSubmit={handleLogin}>
              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Button
                type="submit"
                className="btn-primary-custom w-100 mb-3"
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Login'}
              </Button>
            </Form>

            <p className="text-center text-muted">
              Don't have an account?{' '}
              <Link to="/signup" className="text-decoration-none" style={{ color: '#667eea' }}>
                Sign up here
              </Link>
            </p>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
}
