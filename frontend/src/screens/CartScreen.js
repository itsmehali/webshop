import React, { useEffect } from 'react';
import {
  Row,
  Col,
  Image,
  Form,
  Button,
  Card,
  ListGroup,
  Container,
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

  // getting data
  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;

  const removeItem = id => {
    console.log('asd');
  };

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);
  return (
    <Row>
      <Col md={8}>
        <h1>Your items</h1>
        <ListGroup variant='flush'>
          {cartItems.map(item => (
            <ListGroup.Item key={item.product}>
              <Row>
                <Col md={3}><h4>{item.name}</h4></Col>
                <Col md={4}>
                  <Image src={item.image} alt={item.name} fluid />
                </Col>
                <Col md={3}>
                  <Form.Control
                    as='select'
                    value={item.qty}
                    onChange={e =>
                      dispatch(addToCart(item.product, Number(e.target.value)))
                    }
                  >
                    {[...Array(item.countInStock).keys()].map(i => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </Form.Control>
                </Col>
                <Col md={2}>
                  <h2> {item.price}</h2>
                  <Button
                    size='sm'
                    type='button'
                    onClick={() => removeItem(item.product)}
                  >
                    {' '}
                    <i className='fas fa-trash'></i>
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Col>
      <Col md={3}>-</Col>
      <Col md={3}>Total</Col>
    </Row>
  );
};

export default CartScreen;
