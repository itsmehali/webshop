import React, { useEffect } from "react";
import {
  Row,
  Col,
  Image,
  Form,
  Button,
  Card,
  ListGroup,
} from "react-bootstrap";
import { addToCart, removeFromCart } from "../actions/cartActions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Message from "../components/Message";

const CartScreen = ({ match, location, history }) => {
  // getting the product id from url
  const productId = match.params.id;

  // getting the quanity
  // ?qty=1  getting the number with split('=') after this is the number
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  // dispatch for calling the action
  const dispatch = useDispatch();

  // getting data
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const removeItem = (id) => {
    dispatch(removeFromCart(id));
  };

  const submitHandler = () => {
    history.push("/login?redirect=shipping");
  };

  const redirectHandler = () => {
    history.push("/");
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
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>
                      <h4>{item.name}</h4>
                    </Link>
                  </Col>
                  <Col md={4}>
                    <Link to={`/product/${item.product}`}>
                      <Image src={item.image} alt={item.name} fluid />
                    </Link>
                  </Col>
                  <Col md={2}>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={3}>
                    <h2> {item.price} €</h2>
                    <Button
                      size="sm"
                      type="button"
                      onClick={() => removeItem(item.product)}
                    >
                      {" "}
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>

      {/* Total */}

      <Col md={3}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>
                Total items:
                {cartItems.reduce(
                  (accumulater, current) => accumulater + current.qty,
                  0
                )}
              </h3>
              <h5>Total Price:</h5>
              <strong>
                {cartItems
                  .reduce(
                    (accumulater, current) =>
                      accumulater + current.qty * current.price,
                    0
                  )
                  .toFixed(2)}
                €
              </strong>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="btn-block"
                disabled={cartItems.length === 0}
                onClick={submitHandler}
              >
                Order
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
      <Col md={3}>
        <Button type="button" className="btn-block" onClick={redirectHandler}>
          Back to shopping
        </Button>
      </Col>
    </Row>
  );
};

export default CartScreen;
