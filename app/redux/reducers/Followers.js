import {
  USER_FOLLOWERS_STATE_CHANGE,
  USER_FOLLOWERS_STATE_ERROR,
  USER_FOLLOWERS_STATE_LOADED,
} from "../constants/user_constants";

const initialState = {
  isLoading: false,
  error: null,
  followers: [],
  following: [],
};

export const followersReducer = (state = initialState, action) => {
  switch (action.value) {
    case USER_FOLLOWERS_STATE_CHANGE:
      return {
        ...state,
        isLoading: true,
      };
    case USER_FOLLOWERS_STATE_LOADED:
      return {
        ...state,
        isLoading: false,
        following: action.payload,
        followers: action.payload,
      };
    case USER_FOLLOWERS_STATE_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      break;
  }
};
