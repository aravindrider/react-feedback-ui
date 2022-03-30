import React, { Component } from 'react';
import { Container, Col, Navbar } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

export default function Footer() {
  let fullYear = new Date().getFullYear();
  let location = useLocation();

  if (
    location.pathname.startsWith('/public') ||
    location.pathname.startsWith('/success')
  ) {
    return null;
  }
  return (
    <div>
      <Navbar fixed='bottom' bg='dark' variant='dark'>
        <Container>
          <Col lg={12} className='text-center text-muted'>
            <div>
              {' '}
              {fullYear}-{fullYear + 1} All Rights Reserved By Aravind S
            </div>
          </Col>
        </Container>
      </Navbar>
    </div>
  );
}
