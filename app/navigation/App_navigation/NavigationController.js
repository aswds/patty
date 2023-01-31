import { onAuthStateChanged } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../../firebase";
import { Loader } from "../SignIn&SingUp/components/Loader";
import { LoginAndRegister } from "../SignIn&SingUp/SignIn_SignUp_nav";
import { App_Navigation } from "./AppNavigation";
import { VerifyEmailNav } from "../EmailVerification/VerifyEmailNav";

export const NavigationController = (props) => {
  const [isSignedIn, setIsSigned] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setIsSigned(true);
    } else {
      setIsSigned(false);
    }
  });
  if (isLoading) {
    return <Loader />;
  }
  if (isSignedIn && !auth.currentUser?.emailVerified) {
    return <VerifyEmailNav />;
  }
  return (
    <>
      {isSignedIn && auth.currentUser?.emailVerified ? (
        <App_Navigation />
      ) : (
        <LoginAndRegister />
      )}
    </>
  );
};
