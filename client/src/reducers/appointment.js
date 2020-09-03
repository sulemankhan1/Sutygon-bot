import {
    GET_APPOINTMENTS,
    APPOINTMENTS_ERROR,
   APPOINTMENT_LOADING,
   APPOINTMENT_SAVED,
    GET_APPOINTMENT,
   APPOINTMENT_DELETED,
  } from "../actions/types";
  const initialState = {
    appointment: null,
    appointments: null,
    loading: false,
    saved: false,
    error: {},
  };
  
  export default function (state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case APPOINTMENT_LOADING:
        return {
          ...state,
          loading: true,
        };
  
      case GET_APPOINTMENTS:
        return {
          ...state,
          products: payload,
          loading: false,
          saved: false,
        };
  
      case GET_APPOINTMENT:
        return {
          ...state,
          product: payload,
          loading: false,
        };
  
      case APPOINTMENT_SAVED:
        return {
          ...state,
          saved: true,
          loading: false,
        };
      case APPOINTMENTS_ERROR:
        return {
          ...state,
          error: payload,
          loading: false,
        };
  
      case APPOINTMENT_DELETED:
        return {
          ...state,
          loading: false,
        };
      default:
        return state;
    }
  }
  