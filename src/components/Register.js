import React, { Component } from 'react';
import { Card, Form, Button, Col, Row, InputGroup } from 'react-bootstrap';
import axios from 'axios';
import MyToast from './MyToast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPhone,
  faEnvelope,
  faLock,
  faUndo,
  faUserPlus,
  faUser,
  faCheck,
  faExclamationCircle,
} from '@fortawesome/free-solid-svg-icons';
import '../index.css';
import userValidation from '../validations/userValidation';

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;
  }

  initialState = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  };

  saveUser = (event) => {
    event.preventDefault();
    console.log(
      this.state.name,
      this.state.email,
      this.state.password,
      this.state.password_confirmation
    );

    const registerUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password_confirmation: this.state.password_confirmation,
    };

    axios
      .post(
        'http://laravelapi-env.eba-buc2trym.us-east-1.elasticbeanstalk.com/api/register',
        registerUser
      )
      .then((response) => {
        if (response.data != null) {
          this.setState({ show: true });
          this.resetRegisterForm();
          setTimeout(() => {
            this.setState({
              show: false,
            });
            this.props.history.push('/login');
          }, 2000);
        }
      })
      .catch((err) => {
        this.setState(userValidation(registerUser));
        console.log(
          this.state.emailError,
          this.state.userEmptyError,
          this.state.passwordError,
          this.state.nameError,
          this.state.confirmPasswordError
        );
        console.log(err);
      });
  };

  resetRegisterForm = () => {
    this.setState(() => this.initialState);
    this.setState({
      registerEmptyError: '',
      nameError: '',
      emailError: '',
      passwordError: '',
      confirmPasswordError: '',
    });
  };

  formchange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    const {
      title,
      name,
      email,
      password,
      password_confirmation,
      emailError,
      userEmptyError,
      passwordError,
      registerEmptyError,
      nameError,
      confirmPasswordError,
    } = this.state;

    return (
      <div>
        <div style={{ display: this.state.show ? 'block' : 'none' }}>
          <MyToast
            show={this.state.show}
            message='Registered Successfully'
            type={'success'}
          />
        </div>
        <Row
          className='justify-content-md-center'
          style={{ marginTop: '70px' }}
        >
          <Col xs={5}>
            <Card className={'border border-dark bg-dark text-white'}>
              <Card.Header>
                <FontAwesomeIcon icon={faUserPlus} /> Register
              </Card.Header>
              <Card.Body>
                <Row>
                  {registerEmptyError && (
                    <p className='error'>
                      {' '}
                      <FontAwesomeIcon icon={faExclamationCircle} />{' '}
                      {registerEmptyError}
                    </p>
                  )}
                  {nameError && !registerEmptyError && (
                    <p className='error'>
                      {' '}
                      <FontAwesomeIcon icon={faExclamationCircle} /> {nameError}
                    </p>
                  )}
                  <Form.Group as={Col}>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faUser} />
                      </InputGroup.Text>

                      <Form.Control
                        required
                        autoComplete='off'
                        type='text'
                        name='name'
                        value={name}
                        onChange={this.formchange}
                        className={'bg-dark text-white'}
                        placeholder='Enter User Name'
                      />
                    </InputGroup>
                  </Form.Group>
                </Row>

                <Row style={{ marginTop: '25px' }}>
                  {emailError && !registerEmptyError && (
                    <p className='error'>
                      {' '}
                      <FontAwesomeIcon icon={faExclamationCircle} />{' '}
                      {emailError}
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
                        value={email}
                        onChange={this.formchange}
                        className={'bg-dark text-white'}
                        placeholder='Enter Email Here'
                      />
                    </InputGroup>
                  </Form.Group>
                </Row>

                <Row style={{ marginTop: '25px' }}>
                  {passwordError && !registerEmptyError && (
                    <p className='error'>
                      {' '}
                      <FontAwesomeIcon icon={faExclamationCircle} />{' '}
                      {passwordError}
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
                        value={password}
                        onChange={this.formchange}
                        className={'bg-dark text-white'}
                        placeholder='Enter Password Here'
                      />
                    </InputGroup>
                  </Form.Group>
                </Row>

                <Row style={{ marginTop: '25px' }}>
                  {confirmPasswordError && !registerEmptyError && (
                    <p className='error'>
                      {' '}
                      <FontAwesomeIcon icon={faExclamationCircle} />{' '}
                      {confirmPasswordError}
                    </p>
                  )}
                  <Form.Group as={Col}>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faCheck} />
                      </InputGroup.Text>

                      <Form.Control
                        required
                        autoComplete='off'
                        type='password'
                        name='password_confirmation'
                        value={password_confirmation}
                        onChange={this.formchange}
                        className={'bg-dark text-white'}
                        placeholder='Confirm Password Here'
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
                  onClick={this.saveUser}
                >
                  <FontAwesomeIcon icon={faUserPlus} /> Register
                </Button>{' '}
                <Button
                  size='sm'
                  type='button'
                  variant='info'
                  onClick={this.resetRegisterForm}
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
}
