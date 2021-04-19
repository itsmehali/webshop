import {
  CART_ADD,
  CART_REMOVE,
  CART_SHIPPING_ADDRESS,
  CART_PAYMENT_METHOD,
} from '../constants/cartConstants';

export const cartReducer = (
  state = { cartItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case CART_ADD:
      //payload
      const item = action.payload;

      // checking if the item is available
      const isAvailable = state.cartItems.find(i => i.product === item.product);

      // checking
      if (isAvailable) {
        return {
          ...state,
          cartItems: state.cartItems.map(i =>
            i.product === isAvailable.product ? item : i
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case CART_REMOVE:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          item => item.product !== action.payload
        ),
      };
    case CART_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };
    case CART_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };
    default:
      return state;
      break;
  }
};
