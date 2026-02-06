import React from 'react';
import { Card, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function ListingCard({ listing }) {
  const avgRating = listing.reviews && listing.reviews.length > 0
    ? (listing.reviews.reduce((acc, rev) => acc + rev.rating, 0) / listing.reviews.length).toFixed(1)
    : 0;

  return (
    <Link to={`/listings/${listing._id}`} className="text-decoration-none">
      <Card className="listing-card h-100">
        <Card.Img 
          variant="top" 
          src={listing.image?.url || 'https://via.placeholder.com/400x300?text=Listing'} 
          className="listing-image"
        />
        <Card.Body>
          <div className="mb-2">
            <Badge bg="light" text="dark" className="category-badge">
              {listing.category || 'Trending'}
            </Badge>
          </div>
          <Card.Title className="card-title" style={{ fontSize: '1.1rem' }}>
            {listing.title}
          </Card.Title>
          <Card.Text className="text-muted small" style={{ height: '40px', overflow: 'hidden' }}>
            {listing.location}
          </Card.Text>
          <div className="d-flex justify-content-between align-items-center">
            <div className="price-tag">
              ${listing.price}/night
            </div>
            <div className="star">
              ⭐ {avgRating} ({listing.reviews?.length || 0})
            </div>
          </div>
        </Card.Body>
      </Card>
    </Link>
  );
}
