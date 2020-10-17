import {
    GET_ORDERS,
    ORDERS_ERROR,
   ORDER_LOADING,
   ORDER_SAVED,
    GET_ORDER,
   ORDER_DELETED,
  } from "../actions/types";
  const initialState = {
    order: null,
    orders: null,
    loading: false,
    saved: false,
    error: {},
  };
  
  export default function (state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case ORDER_LOADING:
        return {
          ...state,
          loading: true,
        };
  
      case GET_ORDERS:
        return {
          ...state,
          orders: payload,
          loading: false,
          saved: false,
        };
  
      case GET_ORDER:
        return {
          ...state,
          order: payload,
          loading: false,
        };
  
      case ORDER_SAVED:
        return {
          ...state,
          saved: true,
          loading: false,
        };
      case ORDERS_ERROR:
        return {
          ...state,
          error: payload,
          loading: false,
        };
  
      case ORDER_DELETED:
        return {
          ...state,
          loading: false,
        };
      default:
        return state;
    }
  }
  