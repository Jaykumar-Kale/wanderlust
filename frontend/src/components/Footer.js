import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

export default function Footer() {
  return (
    <footer className="footer-custom mt-5">
      <Container>
        <Row className="py-5">
          <Col md={3} className="mb-4">
            <h5 className="fw-bold">🏡 WanderLust</h5>
            <p className="text-muted small">Your gateway to unique stays around the world</p>
          </Col>
          <Col md={3} className="mb-4">
            <h6 className="fw-bold">Quick Links</h6>
            <ul className="list-unstyled small">
              <li><a href="/" className="text-decoration-none">Home</a></li>
              <li><a href="/listings/new" className="text-decoration-none">List Property</a></li>
              <li><a href="/" className="text-decoration-none">Browse Listings</a></li>
            </ul>
          </Col>
          <Col md={3} className="mb-4">
            <h6 className="fw-bold">Support</h6>
            <ul className="list-unstyled small">
              <li><a href="/" className="text-decoration-none">Help Center</a></li>
              <li><a href="/" className="text-decoration-none">Contact Us</a></li>
              <li><a href="/" className="text-decoration-none">Privacy Policy</a></li>
            </ul>
          </Col>
          <Col md={3} className="mb-4">
            <h6 className="fw-bold">Follow Us</h6>
            <div className="small">
              <a href="/" className="text-decoration-none me-2">Facebook</a>
              <a href="/" className="text-decoration-none me-2">Twitter</a>
              <a href="/" className="text-decoration-none">Instagram</a>
            </div>
          </Col>
        </Row>
        <Row className="border-top pt-3">
          <Col className="text-center text-muted small">
            <p>&copy; 2026 WanderLust. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
