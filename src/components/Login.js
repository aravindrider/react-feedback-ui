import React, { useState, useContext } from 'react';
import { Card, Form, Button, Col, Row, InputGroup } from 'react-bootstrap';
import axios from 'axios';
import MyToast from './MyToast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSignInAlt,
  faEnvelope,
  faLock,
  faUndo,
  faExclamationCircle,
} from '@fortawesome/free-solid-svg-icons';
import '../index.css';
import { LoginContext } from './LoginContext';
import userValidation from '../validations/userValidation';

export default function Login(props) {
  const initialState = {
    email: '',
    password: '',
  };

  const errorState = {
    userEmptyError: '',
    emailError: '',
    passwordError: '',
  };

  const [show, setShow] = useState(false);
  const { isLogin, setIsLogin } = useContext(LoginContext);
  const [user, setUser] = useState(initialState);
  const [error, setError] = useState(errorState);
  const [authError, setAuthError] = useState({});

  const authenticateUser = (event) => {
    event.preventDefault();
    console.log(user.email, user.password);
    const User = {
      email: user.email,
      password: user.password,
    };
    axios
      .post(
        'http://laravelapi-env.eba-buc2trym.us-east-1.elasticbeanstalk.com/api/login',
        User
      )
      .then((response) => {
        if (response.data != null) {
          localStorage.setItem('token', response.data.token);
          setIsLogin(true);
          setShow(true);
          resetRegisterForm();
          setTimeout(() => {
            setShow(false);
            return props.history.push('/list');
          }, 2000);
        }
      })
      .catch((error) => {
        let authError = error.response.data.error;
        setAuthError(error.response.data.error);

        setError(userValidation(User));
      });
  };

  const resetRegisterForm = () => {
    setUser(initialState);
    setError(errorState);
  };

  const formchange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <div>
      <div style={{ display: show ? 'block' : 'none' }}>
        <MyToast show={show} message='Logged In Successful' type={'success'} />
      </div>
      <Row className='justify-content-md-center' style={{ marginTop: '70px' }}>
        <Col xs={5}>
          <Card className={'border border-dark bg-dark text-white'}>
            <Card.Header>
              <FontAwesomeIcon icon={faSignInAlt} /> Login
            </Card.Header>
            <Card.Body>
              <Row>
                {error.userEmptyError && (
                  <p className='error' style={{ marginTop: '15px' }}>
                    {' '}
                    <FontAwesomeIcon icon={faExclamationCircle} />{' '}
                    {error.userEmptyError}
                  </p>
                )}
                {error.emailError && !error.userEmptyError && (
                  <p className='error' style={{ marginTop: '15px' }}>
                    {' '}
                    <FontAwesomeIcon icon={faExclamationCircle} />{' '}
                    {error.emailError}
                  </p>
                )}
                <Form.Group as={Col}>
                  <InputGroup>
                    <InputGroup.Text>
                      <FontAwesomeIcon icon={faEnvelope} />
                    </InputGroup.Text>

                    <Form.Control
                      required
                      autoComplete='off'
                      type='email'
                      name='email'
                      value={user.email}
                      onChange={formchange}
                      className={'bg-dark text-white'}
                      placeholder='Enter Email Id'
                    />
                  </InputGroup>
                </Form.Group>
              </Row>

              <Row style={{ marginTop: '25px' }}>
                {error.passwordError && !error.userEmptyError && (
                  <p className='error' style={{ marginTop: '15px' }}>
                    {' '}
                    <FontAwesomeIcon icon={faExclamationCircle} />{' '}
                    {error.passwordError}
                  </p>
                )}
                <Form.Group as={Col}>
                  <InputGroup>
                    <InputGroup.Text>
                      <FontAwesomeIcon icon={faLock} />
                    </InputGroup.Text>

                    <Form.Control
                      required
                      autoComplete='off'
                      type='password'
                      name='password'
                      value={user.password}
                      onChange={formchange}
                      className={'bg-dark text-white'}
                      placeholder='Enter Password Here'
                    />
                  </InputGroup>
                </Form.Group>
              </Row>
            </Card.Body>
            <Card.Footer style={{ textAlign: 'right', marginTop: '10px' }}>
              <Button
                size='sm'
                type='button'
                variant='success'
                onClick={authenticateUser}
              >
                <FontAwesomeIcon icon={faSignInAlt} /> Login
              </Button>{' '}
              <Button
                size='sm'
                type='button'
                variant='info'
                onClick={resetRegisterForm}
              >
                <FontAwesomeIcon icon={faUndo} /> Reset
              </Button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
