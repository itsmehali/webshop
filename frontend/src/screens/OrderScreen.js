import React, { useState } from 'react';
import { Button, Col, Row, Image, Card, ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Message from '../components/Message';

const OrderScreen = () => {
  const cart = useSelector(state => state.cart);

  return (
    <>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={2}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x {item.price}€ ={' '}
                          <strong>{item.qty * item.price}€</strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>{cart.paymentMethod}</p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                {cart.shippingAddress.country},{' '}
                {cart.shippingAddress.postalCode}, {cart.shippingAddress.city},{' '}
                {cart.shippingAddress.address},
              </p>
            </ListGroup.Item>
          </ListGroup>
          <Link to='/payment'>
            <Button type='button' variant='primary'>
              Back to Payment
            </Button>
          </Link>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
