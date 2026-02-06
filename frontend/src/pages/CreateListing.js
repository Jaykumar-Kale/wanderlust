import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addListing } from '../redux/listingSlice';
import { listingAPI } from '../services/api';

export default function CreateListing() {
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
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name.includes('rooms') || name === 'maxGuests' ? Number(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await listingAPI.create(formData);
      dispatch(addListing(response.data.data));
      navigate(`/listings/${response.data.data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Error creating listing');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5">
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <Card className="border-0 shadow-sm">
          <Card.Body className="p-5">
            <h2 className="mb-4" style={{ color: '#667eea' }}>Create New Listing</h2>

            {error && <Alert variant="danger" className="error-alert">{error}</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  placeholder="Beautiful beachfront villa"
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
                  placeholder="Describe your property..."
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
                  placeholder="100"
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
                  placeholder="City name"
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
                  placeholder="Country"
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
                  placeholder="WiFi, Pool, AC, Kitchen..."
                  value={formData.amenities}
                  onChange={handleChange}
                />
              </Form.Group>

              <Button
                type="submit"
                className="btn-primary-custom w-100"
                disabled={loading}
              >
                {loading ? 'Creating...' : 'Create Listing'}
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
}
