import axios from "axios";
import {
  
  APPOINTMENT_LOADING,
 APPOINTMENT_SAVED,
  APPOINTMENT_ERROR,
  GET_APPOINTMENTS,
  GET_APPOINTMENT,
  APPOINTMENTS_ERROR,
  APPOINTMENTS_LOADING,
  APPOINTMENT_DELETED,
 

} from "./types";
import { setAlert } from "./alert";


// Add new product
export const addNewAppointment = (appointment) => async (dispatch) => {
    dispatch({ type: APPOINTMENT_LOADING });
  
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
  
    const body = JSON.stringify(appointment);
    try {
      const res = await axios.post("/api/appointments/add", body, config);
  
      dispatch({
        type: APPOINTMENT_SAVED,
      });
      
      dispatch(setAlert(res.data.msg, "success"));

    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }
      dispatch({
        type: APPOINTMENT_ERROR,
      });
    }
  };

  // get All Users
export const getAllAppointments = () => async (dispatch) => {
  dispatch({ type: APPOINTMENT_LOADING });
  try {
    const res = await axios.get(`/api/appointments`);
    dispatch({
      type: GET_APPOINTMENTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: APPOINTMENTS_ERROR,
      payload: err.response,
    });
  }
};



// Get User by ID
export const getAppointment = (id) => async (dispatch) => {
  dispatch({ type: APPOINTMENTS_LOADING });
 
  try {
    const res = await axios.get(`/api/appointments/${id}`);
    dispatch({
      type: GET_APPOINTMENT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: APPOINTMENTS_ERROR,
      payload: err.response,
    });
  }
};


  // Delete User
export const deleteAppointment = (id) => async (dispatch) => {
  dispatch({ type: APPOINTMENTS_LOADING });
    try {

    const res = await axios.delete(`/api/appointmnets/${id}`);
    dispatch({
      type: APPOINTMENT_DELETED,
      payload: res.data,
    });
    dispatch(setAlert(res.data.msg, "success"));
    dispatch(getAllAppointments());
  
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: APPOINTMENTS_ERROR,
    });
  }
};