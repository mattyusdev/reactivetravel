import {
  USERS_LOGIN,
  USERS_LOGOUT,
  USERS_POST_REQUEST,
  USERS_POST_SUCCESS,
  USERS_POST_FAILURE,
  USERS_REGISTERED,
  USERS_NOTREGISTERED
} from "./userTypes";

const initialState = {
  userData: {},
  loading: false,
  isRegistered: false,
  response: false,
  isLogged: false
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USERS_POST_REQUEST:
      return { ...state, loading: true };
    case USERS_POST_SUCCESS:
      return {
        ...state,
        userData: action.payload,
        loading: false
      };
    case USERS_POST_FAILURE:
      return {
        ...state,
        userData: {},
        response: action.payload,
        loading: false
      };
    case USERS_LOGIN:
      return { ...state, isLogged: true };
    case USERS_LOGOUT:
      return { ...state, isLogged: false };
    case USERS_REGISTERED:
      return { ...state, isRegistered: true };
    case USERS_NOTREGISTERED:
      return { ...state, isRegistered: false };
    default:
      return state;
  }
};
