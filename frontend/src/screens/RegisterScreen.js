import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../actions/userActions';
import Loader from '../components/Loader';
import FormSkeleton from '../components/FormSkeleton';
import Message from '../components/Message';

const RegisterScreen = ({ location, history }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  // getting data from userRegister (store.js)
  const userRegister = useSelector(state => state.userRegister);
  const { userInfo, loading, error } = userRegister;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    // cheking if logged in
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, redirect, userInfo]);

  const submitHandler = e => {
    e.preventDefault();

    // checking if passwords match
    if (password !== confirmPassword) {
      setMessage('Passwords do not match!');
    } else {
      // dispatch register
      setMessage(null);
      dispatch(register(name, email, password));
    }
  };

  return (
    <FormSkeleton>
      <h1>Register</h1>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            placeholder='Enter name'
            value={name}
            type='name'
            onChange={e => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            placeholder='Enter email'
            value={email}
            type='email'
            onChange={e => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            placeholder='Enter password'
            value={password}
            type='password'
            onChange={e => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='confirmPassword'>
          <Form.Label>confirmPassword</Form.Label>
          <Form.Control
            placeholder='Enter Confirm Password'
            value={confirmPassword}
            type='password'
            onChange={e => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Sign In
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          <Link to={redirect ? `login?redirect=${redirect}` : '/login'}>
            Login
          </Link>
        </Col>
      </Row>
    </FormSkeleton>
  );
};

export default RegisterScreen;
