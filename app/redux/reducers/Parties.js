import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  error: null,
  parties: [],
};

export const partiesSlice = createSlice({
  name: "parties",
  initialState,
  reducers: {
    partiesLoading(state) {
      state.isLoading = true;
    },
    partiesReceived(state, action) {
      state.isLoading = false;
      state.parties = action.payload;
    },
  },
});

export default partiesSlice.reducer;

export const { partiesLoading, partiesReceived } = partiesSlice.actions;
