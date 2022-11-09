import {
  USER_INFO_LOADING,
  USER_INFO_LOADED,
  USER_STATE_CHANGE,
  USER_FOLLOWERS_STATE_CHANGE,
  USER_FOLLOWING_STATE_CHANGE,
} from "../constants/user_constants";

const initialState = {
  isLoading: true,
  current_user: {},
  following: [],
  followers: [],
};

export const user_reducer = (state = initialState, action) => {
  console.log(action.currentUser);
  switch (action.type) {
    // case USER_INFO_LOADING: {
    //   return {
    //     ...state,
    //     isLoading: true,
    //   };
    // }
    // case USER_INFO_LOADED: {
    //   return {
    //     ...state,
    //     isLoading: false,
    //     currentUser: action.currentUser,
    //   };
    // }
    case USER_STATE_CHANGE:
      return {
        ...state,
        isLoading: false,

        current_user: action.current_user,
      };
    case USER_FOLLOWING_STATE_CHANGE:
      return {
        ...state,
        following: action.following,
      };
    case USER_FOLLOWERS_STATE_CHANGE:
      return {
        ...state,
        followers: action.followers,
      };
    default:
      return state;
  }
};
