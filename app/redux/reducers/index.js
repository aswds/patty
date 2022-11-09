import { combineReducers } from "redux";
import { user_reducer } from "./User";
export const Reducers = combineReducers({
  userState: user_reducer,
});

export default Reducers;
