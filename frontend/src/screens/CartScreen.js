import React, { useEffect } from 'react';
import {
  Row,
  Col,
  Image,
  Form,
  Button,
  Card,
  ListGroup,
} from 'react-bootstrap';
import { addToCart } from '../actions/cartActions';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const CartScreen = ({ match, location, history }) => {
  // getting the product id from url
  const productId = match.params.id;

  // getting the quanity
  // ?qty=1  getting the number with split('=') after this is the number
  const qty = location.search ? Number(location.search.split('=')[1]) : 1;

  // dispatch for calling the action
  const dispatch = useDispatch();

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);
  return (
    <Row>
      <Col md={6}>Items</Col>
      <Col md={3}>-</Col>
      <Col md={3}>Total</Col>
    </Row>
  );
};

export default CartScreen;
