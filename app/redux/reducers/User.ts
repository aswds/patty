import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../Types/User";

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
  reducers: {
    userLoading(state) {
      // Use a "state machine" approach for loading state instead of booleans
      state.isLoading = true;
    },
    userReceived(state, action) {
      state.current_user = action.payload;
      state.isLoading = false;
    },
  },
});

export const { userReceived, userLoading } = userSlice.actions;
export default userSlice.reducer;
