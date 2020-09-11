import axios from "axios";
import {
  
  PRODUCT_LOADING,
 PRODUCT_SAVED,
  PRODUCT_ERROR,
  GET_PRODUCTS,
  GET_PRODUCT,
  PRODUCTS_ERROR,
  PRODUCTS_LOADING,
  PRODUCT_DELETED,
  PRODUCT_UPDATED
 

} from "./types";
import { setAlert } from "./alert";
import setAuthToken from "../utils/setAuthToken";


// Add new product
export const addNewProduct = (product) => async (dispatch) => {
    dispatch({ type: PRODUCT_LOADING });
    const config = {
      headers: {
          'content-type': 'multipart/form-data'
      }
  }
    try {
      const res = await axios.post("/api/products/add", product, config);
  
      dispatch({
        type: PRODUCT_SAVED,
      });
      
      dispatch(setAlert(res.data.msg, "success"));

    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }
      dispatch({
        type: PRODUCT_ERROR,
      });
    }
  };

  // get All Users
export const getAllProducts = () => async (dispatch) => {
  dispatch({ type: PRODUCT_LOADING });
  try {
    const res = await axios.get(`/api/products`);

    dispatch({
      type: GET_PRODUCTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PRODUCTS_ERROR,
      payload: err.response,
    });
  }
};



// Get User by ID
export const getProduct = (name) => async (dispatch) => {
  dispatch({ type: PRODUCTS_LOADING });
 
  try {
    const res = await axios.get(`/api/products/${name}`);
    dispatch({
      type: GET_PRODUCT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PRODUCTS_ERROR,
      payload: err.response,
    });
  }
};


// Update User
export const updateProduct = (product, id) => async (dispatch) => {

  dispatch({ type: PRODUCTS_LOADING });
  const config = {
    headers: {
        'content-type': 'multipart/form-data'
    }
}

  try {
    const res = await axios.post(`/api/products/${id}`, product, config);

    dispatch({
      type: PRODUCT_UPDATED,
      payload: res.data,
    });
    dispatch(setAlert(res.data.msg, "success"));
    dispatch(getAllProducts());

  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: PRODUCTS_ERROR,
    });
  }
};
  
  // Delete User
export const deleteProduct = (id) => async (dispatch) => {
  dispatch({ type: PRODUCTS_LOADING });
  const config = {
    headers: {
      "Content-Type": "application/json",
    },  
  };

   try {

    const res = await axios.delete(`/api/products/${id}`);
    dispatch({
      type: PRODUCT_DELETED,
      payload: res.data,
    });
    dispatch(setAlert(res.data.msg, "success"));
    dispatch(getAllProducts());
  
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: PRODUCTS_ERROR,
    });
  }
};