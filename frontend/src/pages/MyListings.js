import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Spinner, Alert, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { listingAPI } from '../services/api';
import ListingCard from '../components/ListingCard';

export default function MyListings() {
  const { token } = useSelector(state => state.auth);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMyListings();
  }, []);

  const fetchMyListings = async () => {
    try {
      const response = await listingAPI.getUserListings();
      setListings(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Error loading listings');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading-spinner"><Spinner animation="border" /></div>;

  return (
    <Container className="py-5">
      <h1 className="mb-4">My Listings</h1>

      {error && <Alert variant="danger" className="error-alert">{error}</Alert>}

      {listings.length > 0 ? (
        <Row className="g-4">
          {listings.map(listing => (
            <Col md={4} key={listing._id} className="mb-3">
              <ListingCard listing={listing} />
            </Col>
          ))}
        </Row>
      ) : (
        <div className="text-center py-5">
          <h4>No listings yet</h4>
          <p className="text-muted mb-3">Start by creating your first listing</p>
          <Button href="/listings/new" className="btn-primary-custom">+ Create Listing</Button>
        </div>
      )}
    </Container>
  );
}
