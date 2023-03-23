import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../Types/User";
import { fetch_user } from "../actions/User";

interface IState {
  isLoading: boolean;
  error: null | string;
  current_user: IUser;
}

const initialState: IState = {
  isLoading: false,
  error: null,
  current_user: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetch_user.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      fetch_user.fulfilled,
      (state, action: PayloadAction<IUser>) => {
        state.current_user = action.payload;
        state.isLoading = false;
      }
    );
  },
});

export const {} = userSlice.actions;
export default userSlice.reducer;
