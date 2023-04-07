import { configureStore } from "@reduxjs/toolkit";
import user_reducer from "../reducers/User";
import events_reducer from "../reducers/Events";
import create_events_reducer from "../reducers/CreateEvent";

export const store = configureStore({
  reducer: {
    user_state: user_reducer,
    events_state: events_reducer,
    create_events_state: create_events_reducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
