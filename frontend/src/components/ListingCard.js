import React from 'react';
import { Card, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function ListingCard({ listing }) {
  const avgRating = listing.reviews && listing.reviews.length > 0
    ? (listing.reviews.reduce((acc, rev) => acc + rev.rating, 0) / listing.reviews.length).toFixed(1)
    : 0;

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= rating ? 'star' : 'star-empty'}>★</span>
      );
    }
    return stars;
  };

  return (
    <Link to={`/listings/${listing._id}`} className="listing-link">
      <Card className="listing-card h-100">
        <div style={{ position: 'relative' }}>
          <Card.Img 
            variant="top" 
            src={listing.image?.url || 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800'} 
            className="listing-image"
            alt={listing.title}
          />
          <Badge className="category-badge">
            {listing.category || 'Rooms'}
          </Badge>
        </div>
        <Card.Body>
          <Card.Title className="fw-bold mb-2" style={{ fontSize: '1rem', color: '#222' }}>
            {listing.title}
          </Card.Title>
          <Card.Text className="text-muted small mb-2">
            📍 {listing.location}
          </Card.Text>
          <div className="d-flex justify-content-between align-items-center mt-3">
            <div>
              <span className="fw-bold" style={{ fontSize: '1.1rem', color: '#222' }}>
                ₹{listing.price?.toLocaleString()}
              </span>
              <span className="text-muted"> /night</span>
            </div>
            {listing.reviews && listing.reviews.length > 0 && (
              <div className="rating">
                {renderStars(Math.round(avgRating))}
                <span className="ms-1 text-muted small">({listing.reviews.length})</span>
              </div>
            )}
          </div>
        </Card.Body>
      </Card>
    </Link>
  );
}
