import axios from "axios";
import {
  
  REPORT_LOADING,
   GET_REPORT,
  REPORT_ERROR,
   

} from "./types";
import { setAlert } from "./alert";
import setAuthToken from "../utils/setAuthToken";


// // Get User by ID
// export const getReport = (name) => async (dispatch) => {
//   dispatch({ type:REPORT_LOADING });
 
//   try {
//     const res = await axios.get(`/api/reports/${name}`);
//     dispatch({
//       type: GET_REPORT,
//       payload: res.data,
//     });
//   } catch (err) {
//     dispatch({
//       type:REPORTS_ERROR,
//       payload: err.response,
//     });
//   }
// };



// Get Report
export const getReport = (report) => async (dispatch) => {
    dispatch({ type:REPORT_LOADING });

      try { 
   
      const res = await axios.get(`/api/reports/`, {
        params: {
          "customer": report.customer,
          "employee": report.employee,
          "start":report.start,
          "end":report.end,
          "reportType":report.reportType
        } }
      )
   
        dispatch({
        type: GET_REPORT,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type:REPORT_ERROR,
        payload: err.response,
      });
    }
  };
  