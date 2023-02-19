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
import useUserLocation from "../../hooks/useUserLocation";

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

export const NavigationController = (props) => {
  const [isSignedIn, setIsSigned] = useState(false);
  const [emailVerified, setEmailVerified] = useState(
    auth.currentUser?.emailVerified
  );
  const [isLoading, setIsLoading] = useState(true);

  // for better user experience calling useUserLocation here and on map screen
  const {} = useUserLocation();
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
