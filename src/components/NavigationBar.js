import React, { Component, useContext } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faComment,
  faSignInAlt,
  faSignOutAlt,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import { LoginContext } from './LoginContext';
import { useHistory, useLocation } from 'react-router-dom';

export default function NavigationBar(props) {
  const { isLogin, setIsLogin } = useContext(LoginContext);
  const history = useHistory();
  let location = useLocation();

  const logout = () => {
    setIsLogin(false);
    localStorage.removeItem('token');
    history.push('/login');
  };

  const guestLinks = (
    <>
      <div className='me-auto'></div>
      <Nav className='navbar-right'>
        <Link to={'register'} className='nav-link'>
          <FontAwesomeIcon icon={faUserPlus} /> <strong>Register</strong>
        </Link>
        <Link to={'login'} className='nav-link'>
          <FontAwesomeIcon icon={faSignInAlt} />
          <strong> Login</strong>
        </Link>
      </Nav>
    </>
  );

  const userLinks = (
    <>
      <Nav className='me-auto'>
        <Link to={'/add'} className='nav-link'>
          <strong> Add Feedback</strong>
        </Link>
        <Link to={'/list'} className='nav-link'>
          <strong>Feedback List</strong>
        </Link>
      </Nav>
      <Nav className='navbar-right'>
        <Nav.Link onClick={logout}>
          <FontAwesomeIcon icon={faSignOutAlt} />
          <strong> Logout </strong>
        </Nav.Link>
      </Nav>
    </>
  );

  if (
    location.pathname.startsWith('/public') ||
    location.pathname.startsWith('/success')
  ) {
    return null;
  }
  return (
    <Navbar bg='dark' variant='dark'>
      <Link to={'/'} className='navbar-brand'>
        {''}
        <FontAwesomeIcon icon={faComment} style={{ marginLeft: '8px' }} />{' '}
        Feedback Guru
      </Link>
      {isLogin ? userLinks : guestLinks}
    </Navbar>
  );
}
