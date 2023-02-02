import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../../../firebase";
import { LoginAndRegister } from "../SignIn&SingUp/SignIn_SignUp_nav";
import { App_Navigation } from "./AppNavigation";
import { VerifyEmailNav } from "../EmailVerification/VerifyEmailNav";
import { eventEmitter } from "../../custom/EventEmitter";
import { EMAIL_VERIFICATION } from "../../screens/constans";

export const NavigationController = (props) => {
  const [isSignedIn, setIsSigned] = useState(false);
  const [emailVerified, setEmailVerified] = useState(
    auth.currentUser?.emailVerified
  );
  useEffect(() => {
    if (!emailVerified) {
      eventEmitter.on(EMAIL_VERIFICATION, () => {
        setEmailVerified(auth.currentUser?.emailVerified);
        eventEmitter.removeAllListeners();
      });
    }
  }, []);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setIsSigned(true);
    } else {
      setIsSigned(false);
    }
  });

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
