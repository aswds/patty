export const initialState = {
  isLoading: false,
};

export const AuthReducer = (prevState, action) => {
  switch (action.type) {
    case "AUTH_START":
      return { ...prevState, isLoading: true };
    case "AUTH_END":
      return { ...prevState, isLoading: false };
  }
};
