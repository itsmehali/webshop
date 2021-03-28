import { CART_ADD, CART_REMOVE } from '../constants/cartConstants';

export const cartReducer = (state = { cartItems: [] }, action) => {
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
    default:
      return state;
      break;
  }
};
