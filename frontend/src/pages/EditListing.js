import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Form, Button, Card, Alert, Spinner } from 'react-bootstrap';
import { listingAPI } from '../services/api';

export default function EditListing() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    country: '',
    category: 'Trending',
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 1,
    amenities: ''
  });

  useEffect(() => {
    fetchListing();
  }, [id]);

  const fetchListing = async () => {
    try {
      const response = await listingAPI.getById(id);
      const listing = response.data.data;
      setFormData({
        title: listing.title || '',
        description: listing.description || '',
        price: listing.price || '',
        location: listing.location || '',
        country: listing.country || '',
        category: listing.category || 'Trending',
        bedrooms: listing.bedrooms || 1,
        bathrooms: listing.bathrooms || 1,
        maxGuests: listing.maxGuests || 1,
        amenities: listing.amenities?.join(', ') || ''
      });
    } catch (err) {
      setError('Error loading listing');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name.includes('rooms') || name === 'maxGuests' ? Number(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await listingAPI.update(id, formData);
      navigate(`/listings/${id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Error updating listing');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="loading-spinner"><Spinner animation="border" /></div>;

  return (
    <Container className="py-5">
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <Card className="border-0 shadow-sm">
          <Card.Body className="p-5">
            <h2 className="mb-4" style={{ color: '#667eea' }}>Edit Listing</h2>

            {error && <Alert variant="danger" className="error-alert">{error}</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Price per Night ($)</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Country</Form.Label>
                <Form.Control
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Select name="category" value={formData.category} onChange={handleChange}>
                  <option>Trending</option>
                  <option>Beachfront</option>
                  <option>Cabins</option>
                  <option>Farms</option>
                  <option>Islands</option>
                  <option>Mansions</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Bedrooms</Form.Label>
                <Form.Control
                  type="number"
                  name="bedrooms"
                  value={formData.bedrooms}
                  onChange={handleChange}
                  min="1"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Bathrooms</Form.Label>
                <Form.Control
                  type="number"
                  name="bathrooms"
                  value={formData.bathrooms}
                  onChange={handleChange}
                  min="1"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Max Guests</Form.Label>
                <Form.Control
                  type="number"
                  name="maxGuests"
                  value={formData.maxGuests}
                  onChange={handleChange}
                  min="1"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Amenities (comma-separated)</Form.Label>
                <Form.Control
                  type="text"
                  name="amenities"
                  value={formData.amenities}
                  onChange={handleChange}
                />
              </Form.Group>

              <Button
                type="submit"
                className="btn-primary-custom w-100"
                disabled={submitting}
              >
                {submitting ? 'Updating...' : 'Update Listing'}
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
}
