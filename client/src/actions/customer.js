import axios from "axios";
import {
  
  CUSTOMER_LOADING,
 CUSTOMER_SAVED,
  CUSTOMER_ERROR,
  GET_CUSTOMERS,
  GET_CUSTOMER,
  CUSTOMERS_ERROR,
  CUSTOMERS_LOADING,
  CUSTOMER_DELETED,
  CUSTOMER_UPDATED
 

} from "./types";
import { setAlert } from "./alert";


// Add new product
export const addNewCustomer = (customer) => async (dispatch) => {
    dispatch({ type: CUSTOMER_LOADING });
  
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
  
    const body = JSON.stringify(customer);
    try {
      const res = await axios.post("/api/customers/add", body, config);
  
      dispatch({
        type: CUSTOMER_SAVED,
      });
      
      dispatch(setAlert(res.data.msg, "success"));

    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }
      dispatch({
        type: CUSTOMER_ERROR,
      });
    }
  };

  // get All Users
export const getAllCustomers = () => async (dispatch) => {
  dispatch({ type: CUSTOMER_LOADING });
  try {
    const res = await axios.get(`/api/customers`);

    dispatch({
      type: GET_CUSTOMERS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CUSTOMERS_ERROR,
      payload: err.response,
    });
  }
};



// Get User by ID
export const getCustomer = (id) => async (dispatch) => {
  dispatch({ type: CUSTOMERS_LOADING });
 
  try {
    const res = await axios.get(`/api/customers/${id}`);
    dispatch({
      type: GET_CUSTOMER,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CUSTOMERS_ERROR,
      payload: err.response,
    });
  }
};


// Update User
export const updateCustomer = (product, id) => async (dispatch) => {
  dispatch({ type: CUSTOMERS_LOADING });
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(product);
  try {
    const res = await axios.post(`/api/customers/${id}`, body, config);

    dispatch({
      type: CUSTOMER_UPDATED,
      payload: res.data,
    });
    dispatch(setAlert(res.data.msg, "success"));
    dispatch(getAllCustomers());

  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: CUSTOMERS_ERROR,
    });
  }
};
  
  // Delete User
export const deleteCustomer = (id) => async (dispatch) => {
  dispatch({ type: CUSTOMERS_LOADING });
  
   try {

    const res = await axios.delete(`/api/customers/${id}`);
    dispatch({
      type: CUSTOMER_DELETED,
      payload: res.data,
    });
    dispatch(setAlert(res.data.msg, "success"));
    dispatch(getAllCustomers());
  
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: CUSTOMERS_ERROR,
    });
  }
};