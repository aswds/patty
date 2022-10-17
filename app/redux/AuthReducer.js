export const initialState = {
  isLoading: false,
};

export const AuthReducer = (prevState, action) => {
  console.log(action.type);
  switch (action.type) {
    case "AUTH_START":
      return { ...prevState, isLoading: true };
    case "AUTH_END":
      return { ...prevState, isLoading: false };
  }
};
