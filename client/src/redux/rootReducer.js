import { combineReducers } from "redux";
import { userReducer } from "./user/userReducer";
import { vacationReducer } from "./vacation/vacationReducer";

const rootReducer = combineReducers({
  user: userReducer,
  vacation: vacationReducer
});

export default rootReducer;
