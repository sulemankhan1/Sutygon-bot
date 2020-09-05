import axios from "axios";
import {
  
  REPORT_LOADING,
   GET_REPORT,
  REPORTS_ERROR,
   

} from "./types";
import { setAlert } from "./alert";
import setAuthToken from "../utils/setAuthToken";


// Get User by ID
export const getReport = (name) => async (dispatch) => {
  dispatch({ type:REPORT_LOADING });
 
  try {
    const res = await axios.get(`/api/reports/${name}`);
    dispatch({
      type: GET_REPORT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type:REPORTS_ERROR,
      payload: err.response,
    });
  }
};
