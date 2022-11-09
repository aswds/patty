import { configureStore } from "@reduxjs/toolkit";
import { AuthReducer } from "../AuthReducer";
import Reducers from "../reducers";
import { user_reducer } from "../reducers/User";
import { getDefaultMiddleware } from "@reduxjs/toolkit";
export default configureStore({
  reducer: {
    user_state: user_reducer,
    middleware: getDefaultMiddleware({
      serializableCheck: false,
    }),
  },
});
