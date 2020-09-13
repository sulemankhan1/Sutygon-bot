import axios from "axios";
import {
  
  ORDER_LOADING,
   GET_ORDERS,
  GET_ORDER,
  ORDERS_ERROR,
  ORDERS_LOADING,
  ORDER_DELETED,
 

} from "./types";
import { setAlert } from "./alert";
import setAuthToken from "../utils/setAuthToken";


// Add new product
// export const addNewOrder = (order) => async (dispatch) => {
//   dispatch({ type: ORDER_LOADING });

//   const config = {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   };

//   const body = JSON.stringify(product);
//   try {
//     const res = await axios.post("/api/orders/add", body, config);

//     dispatch({
//       type: ORDER_SAVED,
//     });
    
//     dispatch(setAlert(res.data.msg, "success"));

//   } catch (err) {
//     const errors = err.response.data.errors;
//     if (errors) {
//       errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
//     }
//     dispatch({
//       type: ORDER_ERROR,
//     });
//   }
// };


  // get All Users
export const getAllOrders = () => async (dispatch) => {
  dispatch({ type: ORDER_LOADING });
  try {
    const res = await axios.get(`/api/orders`);

    dispatch({
      type: GET_ORDERS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ORDERS_ERROR,
      payload: err.response,
    });
  }
};

 // Find users
 export const findOrders = (searchVal) => async (dispatch) => {
  dispatch({ type: ORDER_LOADING });
  try {
    const res = await axios.get(`/api/orders/search/${searchVal}`);

    dispatch({
      type: GET_ORDERS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ORDERS_ERROR,
      payload: err.response,
    });
  }
};



// Get User by ID
export const getOrder = (id) => async (dispatch) => {
  dispatch({ type: ORDERS_LOADING });
 
  try {
    const res = await axios.get(`/api/orders/${id}`);
    dispatch({
      type: GET_ORDER,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ORDERS_ERROR,
      payload: err.response,
    });
  }
};


  
  // Delete User
export const deleteOrder = (id) => async (dispatch) => {
  dispatch({ type: ORDERS_LOADING });
  const config = {
    headers: {
      "Content-Type": "application/json",
    },  
  };

   try {

    const res = await axios.delete(`/api/orders/${id}`);
    dispatch({
      type: ORDER_DELETED,
      payload: res.data,
    });
    dispatch(setAlert(res.data.msg, "success"));
    dispatch(getAllOrders());
  
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: ORDERS_ERROR,
    });
  }
};