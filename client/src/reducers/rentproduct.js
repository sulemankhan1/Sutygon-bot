import {
    GET_RENTPRODUCTS,
    RENTPRODUCTS_ERROR,
   RENTPRODUCT_LOADING,
   RENTPRODUCT_SAVED,
    GET_RENTPRODUCT,
   RENTPRODUCT_DELETED,
  } from "../actions/types";
  const initialState = {
    rentproduct: null,
    rentproducts: null,
    loading: false,
    saved: false,
    error: {},
  };
  
  export default function (state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case RENTPRODUCT_LOADING:
        return {
          ...state,
          loading: true,
        };
  
      case GET_RENTPRODUCTS:
        return {
          ...state,
          rentproducts: payload,
          loading: false,
          saved: false,
        };
  
      case GET_RENTPRODUCT:
        return {
          ...state,
          rentproduct: payload,
          loading: false,
        };
  
      case RENTPRODUCT_SAVED:
        return {
          ...state,
          // saved: true,
          loading: false,
        };
      case RENTPRODUCTS_ERROR:
        return {
          ...state,
          error: payload,
          loading: false,
        };
  
      case RENTPRODUCT_DELETED:
        return {
          ...state,
          loading: false,
        };
      default:
        return state;
    }
  }
  