import React, { useState } from 'react';
import { Button, Form, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FormSkeleton from '../components/FormSkeleton';
import { savePaymentMethod } from '../actions/cartActions';

const PaymentScreen = ({ history }) => {
  const cart = useSelector(state => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress) {
    history.push('/shipping');
  }

  const [paymentMethod, setPaymentMethod] = useState('Visa');

  const dispatch = useDispatch();

  const submitHandler = e => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push('/order');
  };

  return (
    <FormSkeleton>
      <h1>Payment</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as='legend'>Select Payment Method</Form.Label>
        </Form.Group>
        <Col>
          <Form.Check
            type='radio'
            id='Visa'
            label='Visa'
            value='Visa'
            name='paymentMethod'
            checked
            onChange={e => setPaymentMethod(e.target.value)}
          ></Form.Check>

          <Form.Check
            type='radio'
            id='MasterCard'
            label='MasterCard'
            value='MasterCard'
            name='paymentMethod'
            onChange={e => setPaymentMethod(e.target.value)}
          ></Form.Check>

          <Form.Check
            type='radio'
            id='PayPal'
            label='PayPal'
            value='PayPal'
            name='paymentMethod'
            onChange={e => setPaymentMethod(e.target.value)}
          ></Form.Check>
        </Col>
        <Button type='submit' variant='primary'>
          Next
        </Button>
        {'      '}
        <Link to='/shipping'>
          <Button type='button' variant='primary'>
            Back to Shipping
          </Button>
        </Link>
      </Form>
    </FormSkeleton>
  );
};

export default PaymentScreen;
