import {

  USER_LOADING,
  USER_DELETED,
  GET_USER,
  USER_ERROR,
  USER_UPDATED,
  USER_SAVED,
  GET_USERS

} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  profile: null,
  users: null,
  loading: false,
  error: {},
  resetToken: null,
  passwordUpdated: false
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADING:
      return {
        ...state,
        loading: true,

      };
     case GET_USERS:
      return {
        ...state,
        users: payload,
      };
    case GET_USER:
      return {
        ...state,
        profile: payload,
      };

      case USER_SAVED:
        return {
          ...state,
          loading: false,
         saved: true,
         
        }

    case USER_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    
    case USER_UPDATED:
      return {
        ...state,
        // users: payload,
        loading: false,
        passwordUpdated: true,
      };
    case USER_DELETED:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}