import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';
import { authAPI } from '../services/api';
import UserAvatar from '../components/UserAvatar';

export default function Profile() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUser();
  }, [id]);

  const fetchUser = async () => {
    try {
      const response = await authAPI.getUserProfile(id);
      setUser(response.data.user);
    } catch (err) {
      setError('Error loading profile');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading-spinner"><Spinner animation="border" /></div>;

  return (
    <Container className="py-5">
      {error && <Alert variant="danger">{error}</Alert>}
      
      {user && (
        <Row>
          <Col md={6} className="mx-auto">
            <Card className="border-0 shadow-sm">
              <Card.Body className="p-5 text-center">
                <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
                  <UserAvatar user={user} size="120px" />
                </div>
                <h2>{user.username}</h2>
                <p className="text-muted">{user.email}</p>
                {user.bio && (
                  <p className="mt-3">{user.bio}</p>
                )}
                <div className="mt-4 text-start">
                  <p><strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
                  {user.phone && <p><strong>Phone:</strong> {user.phone}</p>}
                  <p><strong>Host Status:</strong> {user.isHost ? '✅ Host' : '❌ Guest'}</p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
}
