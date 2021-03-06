import { useReducer, createContext } from "react";

export const Store = createContext();

const initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
  },
};

function reducer(state, action) {
  switch (action.type) {
    case "CART_ADD_ITEM":
      const newItem = action.payload;
      const existingItem = state.cart.cartItems.find(
        (item) => item._id == newItem._id
      );
      const cartItems = existingItem
        ? state.cart.cartItems.map((item) =>
            item._id == existingItem._id ? newItem : item
          )
        : [...state.cart.cartItems, newItem];
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    case "CART_REMOVE_ITEM": {
      const cartItems = state.cart.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    default:
      return state;
  }
}

//Wishlist Start
const initialState2 = {
  wishlist: {
    wishlistItems: localStorage.getItem("wishlistItems")
      ? JSON.parse(localStorage.getItem("wishlistItems"))
      : [],
  },
};

function reducer2(state, action) {
  switch (action.type) {
    case "WISHLIST_ADD_ITEM":
      const newItem = action.payload;
      const existingItem = state.wishlist.wishlistItems.find(
        (item) => item._id == newItem._id
      );
      const wishlistItems = existingItem
        ? state.wishlist.wishlistItems.map((item) =>
            item._id == existingItem._id ? newItem : item
          )
        : [...state.wishlist.wishlistItems, newItem];
      localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems));
      return { ...state, wishlist: { ...state.wishlist, wishlistItems } };
    case "WISHLIST_REMOVE_ITEM": {
      const wishlistItems = state.wishlist.wishlistItems.filter(
        (item) => item._id !== action.payload._id
      );
      localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems));
      return { ...state, wishlist: { ...state.wishlist, wishlistItems } };
    }
    default:
      return state;
  }
}

// Sign in
const initialState3 = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
};

function reducer3(state, action) {
  switch (action.type) {
    case "USER_SIGNIN":
      return { ...state, userInfo: action.payload };
    case "USER_LOGOUT":
      return { ...state, userInfo: null };
    default:
      return state;
  }
}

// Shipping
const initialState4 = {
  userInfo: localStorage.getItem("shippingAddress")
    ? JSON.parse(localStorage.getItem("shippingAddress"))
    : null,
};

function reducer4(state, action) {
  switch (action.type) {
    case "SHIPPING_ADDRESS":
      return { ...state, shippingAddress: action.payload };
    default:
      return state;
  }
}

export default function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [state2, dispatch2] = useReducer(reducer2, initialState2);
  const [state3, dispatch3] = useReducer(reducer3, initialState3);
  const [state4, dispatch4] = useReducer(reducer4, initialState4);

  const value = {
    state,
    dispatch,
    state2,
    dispatch2,
    state3,
    dispatch3,
    state4,
    dispatch4,
  };

  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
