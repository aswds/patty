import { createSlice } from "@reduxjs/toolkit";
import { IEvent } from "../../Types/Events";
import { eventsSlice } from "./Events";

type StateType = {
  isLoading: boolean;
  error: null | string;
  events: IEvent[];
};

const initialState: StateType = {
  isLoading: true,
  error: null,
  events: [],
};

export const joined_events_Slice = createSlice({
  name: "joined_events",
  initialState: initialState,
  reducers: {
    eventsLoading(state) {
      state.isLoading = true;
    },
    eventsUploaded(state) {
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {},
});

export default eventsSlice.reducer;

export const { eventsLoading, eventsUploaded } = eventsSlice.actions;
