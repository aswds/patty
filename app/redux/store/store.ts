import { configureStore } from "@reduxjs/toolkit";
import user_reducer from "../reducers/User";
import events_reducer from "../reducers/Events";

export const store = configureStore({
  reducer: {
    user_state: user_reducer,
    events_state: events_reducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
