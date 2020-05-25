import {
  VACATION_GET_REQUEST,
  VACATION_GET_SUCCESS,
  VACATION_GET_FAILURE,
  VACATION_ADMIN_ADDED,
  VACATION_ADMIN_ADDEDFALSE
} from "./vacationTypes";

const initialState = {
  vacations: [],
  loading: false,
  isAdded: false
};

export const vacationReducer = (state = initialState, action) => {
  switch (action.type) {
    case VACATION_GET_REQUEST:
      return { ...state, loading: true };
    case VACATION_GET_SUCCESS:
      return { ...state, vacations: action.payload, loading: false };
    case VACATION_GET_FAILURE:
      return { ...state, vacations: [], loading: false };
    case VACATION_ADMIN_ADDED:
      return { ...state, isAdded: true };
    case VACATION_ADMIN_ADDEDFALSE:
      return { ...state, isAdded: false };
    default:
      return state;
  }
};
