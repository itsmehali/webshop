import axios from 'axios';
import { CART_ADD, CART_REMOVE } from '../constants/cartConstants';

export const addToCart = (id, qty) => async (dispatch, getState) => {
  // getting data with axios
  const { data } = await axios.get(`/api/products/${id}`);

  dispatch({
    type: CART_ADD,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      countInStock: data.countInStock,
      price: data.price,
      qty,
    },
  });

  // saving in local storage, and making it JSON
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = id => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE,
    payload: id,
  });

  // localstorage asking for it
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};
