import * as React from "react";
import { authReducer } from "../../../redux/reducers/AuthReducer";
import { getAuth } from "firebase/auth";

export const AuthContext = React.createContext();

export function AuthContextProvider({ children }) {
  const auth = getAuth();
  const [state, dispatch] = React.useReducer(authReducer, {
    emailVerified: auth.currentUser?.emailVerified,
    isLoading: false,
  });
  const authContext = React.useMemo(
    () => ({
      verifyUserEmail: (data) => {
        auth.currentUser?.reload();
      },
    }),
    []
  );

  return (
    <AuthContext.Provider
      value={{
        verifyUserEmail: authContext.verifyUserEmail,
        userEmailVerified: state.emailVerified,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
