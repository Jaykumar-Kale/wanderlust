import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <Container className="py-5">
      <div className="text-center" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <h1 style={{ fontSize: '120px', margin: 0 }}>404</h1>
        <h2 className="mb-3">Page Not Found</h2>
        <p className="text-muted mb-4">The page you're looking for doesn't exist.</p>
        <Link to="/">
          <Button className="btn-primary-custom">Go Home</Button>
        </Link>
      </div>
    </Container>
  );
}
