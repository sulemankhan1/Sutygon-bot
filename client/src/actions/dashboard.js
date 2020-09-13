import axios from "axios";
import {
    SHOP_STARTED,
    SHOP_STOPPED,
    DASHBOARD_LOADING,
    DASHBOARD_LOADED,
    DASHBOARD_ERROR,
    SHOP_LOADING,
    SHOP_LOADED,
    SHOP_ERROR,
} from "./types";
import { setAlert } from "./alert";
import setAuthToken from "../utils/setAuthToken";

// changeShopStatus
export const changeShopStatus = (status) => async (dispatch) => {
    dispatch({ type: DASHBOARD_LOADING });
    
    try {
      const res = await axios.get(`/api/dashboard/changeStatus/${status}`);
  
      dispatch({
        type: DASHBOARD_LOADED,
        payload: res.data,
      });
      dispatch(setAlert(res.data.msg, "success"));
  
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }
      dispatch({
        type: DASHBOARD_ERROR,
      });
    }
  };

  // getShop
export const getShop = () => async (dispatch) => {
    dispatch({ type: SHOP_LOADING });
    
    try {
      const res = await axios.get(`/api/dashboard/shops/`);
        
      dispatch({
        type: SHOP_LOADED,
        payload: res.data,
      });
      dispatch(setAlert(res.data.msg, "success"));
  
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }
      dispatch({
        type: SHOP_ERROR,
      });
    }
  };