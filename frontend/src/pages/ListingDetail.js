import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Card, Spinner, Alert, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { listingAPI, reviewAPI } from '../services/api';
import UserAvatar from '../components/UserAvatar';

export default function ListingDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token, user } = useSelector(state => state.auth);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    fetchListing();
  }, [id]);

  const fetchListing = async () => {
    try {
      const response = await listingAPI.getById(id);
      setListing(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Error loading listing');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteListing = async () => {
    if (window.confirm('Are you sure you want to delete this listing?')) {
      try {
        await listingAPI.delete(id);
        navigate('/my-listings');
      } catch (err) {
        alert('Error deleting: ' + err.response?.data?.message);
      }
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    setSubmittingReview(true);
    try {
      await reviewAPI.createReview(id, { comment, rating });
      setComment('');
      setRating(5);
      fetchListing();
    } catch (err) {
      alert('Error: ' + err.response?.data?.message);
    } finally {
      setSubmittingReview(false);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    if (window.confirm('Delete this review?')) {
      try {
        await reviewAPI.deleteReview(id, reviewId);
        fetchListing();
      } catch (err) {
        alert('Error: ' + err.response?.data?.message);
      }
    }
  };

  if (loading) return <div className="loading-spinner"><Spinner animation="border" /></div>;
  if (error) return <Container className="py-5"><Alert variant="danger">{error}</Alert></Container>;
  if (!listing) return <Container className="py-5"><Alert variant="warning">Listing not found</Alert></Container>;

  return (
    <Container className="py-5">
      <Row className="mb-4">
        <Col>
          <Button variant="secondary" onClick={() => navigate(-1)}>← Back</Button>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col md={8}>
          <img 
            src={listing.image?.url || 'https://via.placeholder.com/600x400'} 
            alt={listing.title}
            className="img-fluid rounded mb-4"
            style={{ maxHeight: '400px', objectFit: 'cover', width: '100%' }}
          />
          <Card className="mb-4">
            <Card.Body>
              <h1 className="mb-3">{listing.title}</h1>
              <p className="text-muted mb-3">{listing.location}, {listing.country}</p>
              <p className="mb-4">{listing.description}</p>
              
              <div className="mb-4">
                <h5>Property Details</h5>
                <ul className="list-unstyled">
                  <li>Bedrooms: <strong>{listing.bedrooms}</strong></li>
                  <li>Bathrooms: <strong>{listing.bathrooms}</strong></li>
                  <li>Max Guests: <strong>{listing.maxGuests}</strong></li>
                  <li>Category: <strong>{listing.category}</strong></li>
                </ul>
              </div>

              {listing.amenities && listing.amenities.length > 0 && (
                <div className="mb-4">
                  <h5>Amenities</h5>
                  <div>
                    {listing.amenities.map((amenity, idx) => (
                      <span key={idx} className="badge bg-light text-dark me-2 mb-2">
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </Card.Body>
          </Card>

          <Card className="mb-4">
            <Card.Body>
              <h4 className="mb-4">Reviews</h4>
              {listing.reviews && listing.reviews.length > 0 ? (
                listing.reviews.map(review => (
                  <div key={review._id} className="mb-3 pb-3 border-bottom">
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <h6 className="mb-1">{review.author?.username} ⭐ {review.rating}</h6>
                        <p className="text-muted small">{new Date(review.createdAt).toLocaleDateString()}</p>
                      </div>
                      {token && user?.id === review.author?._id && (
                        <Button 
                          size="sm" 
                          variant="danger"
                          onClick={() => handleDeleteReview(review._id)}
                        >
                          Delete
                        </Button>
                      )}
                    </div>
                    <p>{review.comment}</p>
                  </div>
                ))
              ) : (
                <p className="text-muted">No reviews yet</p>
              )}
            </Card.Body>
          </Card>

          {token && user?.id !== listing.owner?._id && (
            <Card>
              <Card.Body>
                <h4 className="mb-4">Leave a Review</h4>
                <Form onSubmit={handleSubmitReview}>
                  <Form.Group className="mb-3">
                    <Form.Label>Rating</Form.Label>
                    <Form.Select value={rating} onChange={(e) => setRating(e.target.value)}>
                      <option value={5}>⭐⭐⭐⭐⭐ 5 Stars</option>
                      <option value={4}>⭐⭐⭐⭐ 4 Stars</option>
                      <option value={3}>⭐⭐⭐ 3 Stars</option>
                      <option value={2}>⭐⭐ 2 Stars</option>
                      <option value={1}>⭐ 1 Star</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Comment</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      placeholder="Share your experience..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Button 
                    type="submit" 
                    className="btn-primary-custom"
                    disabled={submittingReview}
                  >
                    {submittingReview ? 'Submitting...' : 'Submit Review'}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          )}
        </Col>

        <Col md={4}>
          <Card className="sticky-top" style={{ top: '20px' }}>
            <Card.Body>
              <h3 className="price-tag mb-3">₹{listing.price?.toLocaleString()} / night</h3>
              <Button className="btn-primary-custom w-100 mb-3">Book Now</Button>
              
              <div className="mb-3">
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                  <UserAvatar user={listing.owner} size="50px" />
                  <div>
                    <p style={{ margin: 0, fontWeight: 600 }}>{listing.owner?.username}</p>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: '#999' }}>Host</p>
                  </div>
                </div>
                <p className="small text-muted">{listing.owner?.bio || 'No bio available'}</p>
              </div>

              {token && user?.id === listing.owner?._id && (
                <div>
                  <Button 
                    variant="warning" 
                    className="w-100 mb-2"
                    onClick={() => navigate(`/listings/${id}/edit`)}
                  >
                    Edit Listing
                  </Button>
                  <Button 
                    variant="danger" 
                    className="w-100"
                    onClick={handleDeleteListing}
                  >
                    Delete Listing
                  </Button>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
