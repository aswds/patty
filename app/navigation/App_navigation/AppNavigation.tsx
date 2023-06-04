import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";
import _ from "lodash";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { updateUserLocation } from "../../redux/reducers/User";
import { AppNavigator } from "./AppNavigator";
import { getUserLocation } from "../../shared/GetLocationFunctions/getUserLocation";
import { getAddress } from "../../shared/GetLocationFunctions/getAddress";

/**
 * Providing redux store for app
 * */

export const App_Navigation = () => {
  const navigation = useNavigationContainerRef();
  const dispatch = useDispatch();
  useEffect(() => {
    async function updateCurrentUserLocation() {
      const location = await getUserLocation();
      const address = await getAddress(
        location.coords.latitude,
        location.coords.longitude
      );
      dispatch(
        updateUserLocation({
          city: address?.city!,
          location: { ...location.coords, longitudeDelta: 0, latitudeDelta: 0 },
        })
      );
    }
    updateCurrentUserLocation();
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer ref={navigation}>
        <AppNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
