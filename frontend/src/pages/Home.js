import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, Spinner, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setListings, setLoading, setError, clearError } from '../redux/listingSlice';
import { listingAPI } from '../services/api';
import ListingCard from '../components/ListingCard';

export default function Home() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const { listings, loading, error } = useSelector(state => state.listings);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async (params = {}) => {
    dispatch(setLoading(true));
    dispatch(clearError());
    try {
      const response = await listingAPI.getAll(params);
      dispatch(setListings(response.data.data));
    } catch (err) {
      dispatch(setError(err.response?.data?.message || 'Error fetching listings'));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const params = {};
    if (search) params.search = search;
    if (category) params.category = category;
    if (minPrice) params.minPrice = minPrice;
    if (maxPrice) params.maxPrice = maxPrice;
    fetchListings(params);
  };

  return (
    <>
      <div className="hero-section">
        <Container>
          <h1 className="display-4 fw-bold mb-4">Find Your Perfect Stay</h1>
          <p className="lead">Explore unique accommodations around the world</p>
        </Container>
      </div>

      <Container className="py-5">
        <Row className="mb-4">
          <Col>
            <div className="search-container">
              <Form onSubmit={handleSearch}>
                <Row className="g-3">
                  <Col md={3}>
                    <Form.Group>
                      <Form.Label>Search Location</Form.Label>
                      <Form.Control 
                        placeholder="City, country..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={2}>
                    <Form.Group>
                      <Form.Label>Category</Form.Label>
                      <Form.Select 
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                      >
                        <option value="">All Categories</option>
                        <option value="Beachfront">Beachfront</option>
                        <option value="Cabins">Cabins</option>
                        <option value="Farms">Farms</option>
                        <option value="Islands">Islands</option>
                        <option value="Mansions">Mansions</option>
                        <option value="Trending">Trending</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={2}>
                    <Form.Group>
                      <Form.Label>Min Price</Form.Label>
                      <Form.Control 
                        type="number"
                        placeholder="$0"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={2}>
                    <Form.Group>
                      <Form.Label>Max Price</Form.Label>
                      <Form.Control 
                        type="number"
                        placeholder="$1000"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3} className="d-flex align-items-end">
                    <Button type="submit" className="btn-primary-custom w-100">
                      Search
                    </Button>
                  </Col>
                </Row>
              </Form>
            </div>
          </Col>
        </Row>

        {error && <Alert variant="danger" className="error-alert">{error}</Alert>}

        {loading ? (
          <div className="loading-spinner">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <>
            <h2 className="mb-4">{listings.length} Listings Found</h2>
            <Row className="g-4">
              {listings.length > 0 ? (
                listings.map(listing => (
                  <Col md={4} key={listing._id} className="mb-3">
                    <ListingCard listing={listing} />
                  </Col>
                ))
              ) : (
                <Col className="text-center py-5">
                  <h4>No listings found</h4>
                  <p className="text-muted">Try adjusting your search filters</p>
                </Col>
              )}
            </Row>
          </>
        )}
      </Container>
    </>
  );
}
