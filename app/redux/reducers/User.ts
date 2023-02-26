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
//
// export const user_reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case USER_STATE_CHANGE:
//       return {
//         ...state,
//         isLoading: true,
//       };
//     case USER_STATE_LOADED: {
//       return {
//         ...state,
//         isLoading: false,
//         current_user: action.current_user,
//       };
//     }
//
//     default:
//       return state;
//   }
// };
