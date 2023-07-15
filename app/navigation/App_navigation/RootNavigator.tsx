import { PermissionStatus } from "expo-location";
import * as SplashScreen from "expo-splash-screen";
import { onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../../firebase";
import useLocationPermission from "../../hooks/useLocationPermission";
import LocationPermissionScreen from "../../screens/Permissions/LocationPermission";
import { Authorization } from "../Navigators/Authorization/Authorization";
import { App_Navigation } from "./AppNavigation";
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
  const locationPermissionsStatus = useLocationPermission();

  // const [emailVerified, setEmailVerified] = useState<boolean | undefined>(
  //   auth.currentUser?.emailVerified
  // );
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Listener for email verification screen
  // useEffect(() => {
  //   if (!emailVerified) {
  //     eventEmitter.on(EMAIL_VERIFICATION, () => {
  //       setEmailVerified(auth.currentUser?.emailVerified);
  //       eventEmitter.removeAllListeners();
  //     });
  //   }
  // }, []);
  // - Check if user is already signed up or signed in
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setIsSigned(true);
    } else {
      setIsSigned(false);
    }
    const delay = setTimeout(() => {
      setIsLoading(false);
      clearTimeout(delay);
    }, 1000);
  });
  // - Navigate to verification screen if email is not verified
  // if (isSignedIn && !auth.currentUser?.emailVerified) {
  //   return <VerifyEmailNav />;
  // }

  // - If onAuthStateChanged didn't fire yet, the splashscreen is shown
  if (!isLoading) {
    SplashScreen.hideAsync();
    // - Hides splash screen
  }
  console.log(locationPermissionsStatus);
  if (locationPermissionsStatus === PermissionStatus.DENIED) {
    return <LocationPermissionScreen />;
  }

  // -Navigation between main navigator and LoginAndRegister navigator
  return <>{isSignedIn ? <App_Navigation /> : <Authorization />}</>;
};
