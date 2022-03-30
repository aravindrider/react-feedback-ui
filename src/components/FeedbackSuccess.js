import React, { Component } from 'react';
import { Card, Form, Button, Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

export default class extends Component {
  componentDidMount() {
    document.body.style.backgroundColor = '#fff';
  }

  componentWillUnmount() {
    document.body.style.backgroundColor = '#272b30';
  }
  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <Card
          style={{ width: '60rem', marginTop: '200px', marginLeft: '170px' }}
        >
          <Card.Body>
            <Card.Title>
              {' '}
              <FontAwesomeIcon
                icon={faCheckCircle}
                style={{ color: 'green' }}
              />
            </Card.Title>
            <Card.Subtitle className='mb-2 text-muted'>
              Submission Successfully
            </Card.Subtitle>
            <Card.Text className='mb-2 text-muted'>
              Thank Your for Providing Your Valuable Feedback
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
