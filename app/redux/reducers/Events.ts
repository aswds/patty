import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IEvent, ILocation } from "../../Types/Events";

type StateType = {
  isLoading: boolean;
  error: null | string;
  events: IEvent[];
  user_location: ILocation | null;
};

const initialState: StateType = {
  isLoading: true,
  error: null,
  events: [],
  user_location: null,
};

export const eventsSlice = createSlice({
  name: "events",
  initialState: initialState,
  reducers: {
    eventsLoading(state) {
      state.isLoading = true;
    },
    eventsUploaded(state) {
      state.isLoading = false;
    },
  },
});

export default eventsSlice.reducer;

export const { eventsLoading, eventsUploaded } = eventsSlice.actions;
