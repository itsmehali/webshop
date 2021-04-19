import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormSkeleton from '../components/FormSkeleton';
import { saveShippingAddress } from '../actions/cartActions';

const ShippingScreen = ({ history }) => {
  const cart = useSelector(state => state.cart);
  const { shippingAddress } = cart;

  const [country, setCountry] = useState(shippingAddress.address);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [city, setCity] = useState(shippingAddress.city);
  const [address, setAddress] = useState(shippingAddress.address);

  const dispatch = useDispatch();

  const submitHandler = e => {
    e.preventDefault();
    dispatch(saveShippingAddress({ country, postalCode, city, address }));
    history.push('/payment');
  };

  return (
    <FormSkeleton>
      <h1>Shipping details</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='country'>
          <Form.Label>country</Form.Label>
          <Form.Control
            placeholder='Enter Country'
            value={country}
            type='text'
            required
            onChange={e => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='postalCode'>
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            placeholder='Enter postalcode'
            value={postalCode}
            type='text'
            required
            onChange={e => setPostalCode(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='city'>
          <Form.Label>City</Form.Label>
          <Form.Control
            placeholder='Enter City'
            value={city}
            type='text'
            required
            onChange={e => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='address'>
          <Form.Label>Address</Form.Label>
          <Form.Control
            placeholder='Enter address'
            value={address}
            type='text'
            required
            onChange={e => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Next
        </Button>
      </Form>
    </FormSkeleton>
  );
};

export default ShippingScreen;
