import React, { useEffect } from 'react';

export default function Welcome(props) {
  return (
    <div
      className='container-fluid text-sm-center p-5 bg-dark text-white'
      style={{ marginTop: '25px' }}
    >
      <h1 className='display-2'>{props.heading}</h1>
      <blockquote className='blockquote mb-0'>
        <p className='lead'>{props.quote}</p>
        <footer className='blockquote-footer'>{props.footer}</footer>
      </blockquote>
    </div>
  );
}
