import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from '../constants/userConstants';
import axios from 'axios';

export const login = (email, password) => async dispatch => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    // defining the Content-Type
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // getting data with axios from /login
    const { data } = await axios.post(
      '/api/users/login',
      { email, password },
      config
    );

    // sending data back
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    // sending to local storage
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const register = (name, email, password) => async dispatch => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });

    // defining the Content-Type
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // getting data with axios from /register
    const { data } = await axios.post(
      '/api/users',
      { name, email, password },
      config
    );

    // sending data back
    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });

    // login user after registering automatically
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    // sending to local storage
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => dispatch => {
  localStorage.removeItem('userInfo');
  //localStorage.removeItem('cartItems');

  dispatch({ type: USER_LOGOUT });
};
