import { configureStore } from "@reduxjs/toolkit";
import user_reducer from "../reducers/User";

export default configureStore({
  reducer: {
    user_state: user_reducer,
  },
});
