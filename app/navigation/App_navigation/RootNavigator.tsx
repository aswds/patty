import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../../../firebase";
import { LoginAndRegister } from "../SignIn&SingUp/SignIn_SignUp_nav";
import { App_Navigation } from "./AppNavigation";
import { VerifyEmailNav } from "../EmailVerification/VerifyEmailNav";
import { eventEmitter } from "../../custom/EventEmitter";
import { EMAIL_VERIFICATION } from "../../screens/constans";
import Loader from "../../shared/Loaders/Loader";
import { colors } from "../../src/colors";

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

  // for better user experience calling useUserLocation here and on map screen
  // listener for email verification screen
  useEffect(() => {
    if (!emailVerified) {
      eventEmitter.on(EMAIL_VERIFICATION, () => {
        setEmailVerified(auth.currentUser?.emailVerified);
        eventEmitter.removeAllListeners();
      });
    }
  }, []);
  //check if user is already signed up
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setIsSigned(true);
    } else {
      setIsSigned(false);
    }
    setIsLoading(false);
  });
  // navigate to verification screen
  if (isSignedIn && !auth.currentUser?.emailVerified) {
    return <VerifyEmailNav />;
  }

  //if onAuthStateChanged didn't fire yet, the loader is shown
  if (isLoading) {
    return (
      <Loader
        isVisible={true}
        containerStyle={{ backgroundColor: colors.background, flex: 1 }}
      />
    );
  }

  // navigation between main navigator and LoginAndRegister navigator
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
