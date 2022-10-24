import * as React from "react";

export const AuthContext = React.createContext();

export function AuthContextProvider({ children }) {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "AUTH_START":
          return {
            isLoading: true,
          };
        case "AUTH_END":
          return {
            isLoading: false,
          };
      }
    },
    {
      isLoading: false,
    }
  );
  const authContext = React.useMemo(
    () => ({
      signIn: (data) => {
        dispatch({ type: "AUTH_START" });
        setTimeout(() => {
          dispatch({ type: "AUTH_END" });
        }, 1000);
      },
      signUp: (data) => {
        dispatch({ type: "AUTH_START" });
        setTimeout(() => {
          dispatch({ type: "AUTH_END" });
        }, 1000);
      },
    }),
    []
  );

  return (
    <AuthContext.Provider
      value={{
        signIn: authContext.signIn,
        signUp: authContext.signUp,
        isLoading: state.isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
