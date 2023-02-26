import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../../../firebase";
import { LoginAndRegister } from "../SignIn&SingUp/SignIn_SignUp_nav";
import { App_Navigation } from "./AppNavigation";
import { VerifyEmailNav } from "../EmailVerification/VerifyEmailNav";
import { eventEmitter } from "../../custom/EventEmitter";
import { EMAIL_VERIFICATION } from "../../screens/constans";
import * as SplashScreen from "expo-splash-screen";

/**
 *
 * Controls navigator changing
 *
 * -Navigators change depending on these variables (isSignedIn, emailVerified)
 *
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */

export const RootNavigator = () => {
  const [isSignedIn, setIsSigned] = useState<boolean>(false);
  const [emailVerified, setEmailVerified] = useState<boolean | undefined>(
    auth.currentUser?.emailVerified
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Listener for email verification screen
  useEffect(() => {
    if (!emailVerified) {
      eventEmitter.on(EMAIL_VERIFICATION, () => {
        setEmailVerified(auth.currentUser?.emailVerified);
        eventEmitter.removeAllListeners();
      });
    }
  }, []);
  // - Check if user is already signed up or signed in
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setIsSigned(true);
    } else {
      setIsSigned(false);
    }
    setIsLoading(false);
  });
  // - Navigate to verification screen if email is not verified
  if (isSignedIn && !auth.currentUser?.emailVerified) {
    return <VerifyEmailNav />;
  }

  // - If onAuthStateChanged didn't fire yet, the splashscreen is shown
  if (!isLoading) {
    // - Hides splash screen
    SplashScreen.hideAsync();
  }

  // -Navigation between main navigator and LoginAndRegister navigator
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
