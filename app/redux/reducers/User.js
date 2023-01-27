import {
  USER_STATE_CHANGE,
  USER_STATE_ERROR,
  USER_STATE_LOADED,
} from "../constants/user_constants";

const initialState = {
  isLoading: false,
  error: null,
  current_user: {},
};

export const user_reducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_STATE_CHANGE:
      return {
        ...state,
        isLoading: true,
      };
    case USER_STATE_LOADED: {
      return {
        ...state,
        isLoading: false,

        current_user: action.current_user,
      };
    }
    case USER_STATE_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    }

    default:
      return state;
  }
};
