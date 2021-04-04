import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loader = () => {
  return (
    <Spinner
      style={{
        width: '100px',
        height: '100px',
        margin: 'auto',
        display: 'block',
      }}
      role='status'
      animation='border'
    >
      <span className='spinner'>Loading...</span>
    </Spinner>
  );
};

export default Loader;
