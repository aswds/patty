import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IEvent, ILocation } from "../../Types/Events";
import { fetch_events } from "../actions/Events";

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
  extraReducers: (builder) => {
    builder.addCase(fetch_events.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      fetch_events.fulfilled,
      (state, action: PayloadAction<IEvent[]>) => {
        state.isLoading = false;
        state.events = action.payload;
        state.error = null;
      }
    );
    builder.addCase(
      fetch_events.rejected,
      (state, action: PayloadAction<any>) => {
        console.log(action.payload);
        state.error = action.payload || "Something went wrong";
        state.isLoading = false;
      }
    );
  },
});

export default eventsSlice.reducer;

export const { eventsLoading, eventsUploaded } = eventsSlice.actions;
