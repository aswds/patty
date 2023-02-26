import { configureStore } from "@reduxjs/toolkit";
import user_reducer from "../reducers/User";
import parties_reducer from "../reducers/Parties";
import logger from "redux-logger";

export const store = configureStore({
  reducer: {
    user_state: user_reducer,
    parties_state: parties_reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
