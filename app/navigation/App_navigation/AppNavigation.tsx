import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";
import _ from "lodash";
import { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { updateUserLocation } from "../../redux/reducers/User";
import { AppNavigator } from "./AppNavigator";
import { getUserLocation } from "../../shared/GetLocationFunctions/getUserLocation";
import { getAddress } from "../../shared/GetLocationFunctions/getAddress";
import { useForegroundPermissions } from "expo-location";

/**
 * Providing redux store for app
 * */

export const App_Navigation = () => {
  const navigation = useNavigationContainerRef();
  const dispatch = useDispatch();
  const [statusForeground, requestPermissionForeground] =
    useForegroundPermissions();

  useEffect(() => {
    async function updateCurrentUserLocation() {
      await requestPermissionForeground();
      const location = await getUserLocation();
      const address = await getAddress(
        location.coords.latitude,
        location.coords.longitude
      );

      dispatch(
        updateUserLocation({
          city: `${address?.city}`,
          coords: { ...location.coords, longitudeDelta: 0, latitudeDelta: 0 },
          partyLocation: `${address?.countryName.replace(
            " ",
            "_"
          )}_${address?.county?.replace(" ", "_")}_${address?.city.replace(
            " ",
            "_"
          )}`,
          isLocationLoading: false,
        })
      );
    }

    updateCurrentUserLocation();
  }, [statusForeground?.status]);

  return (
    <NavigationContainer ref={navigation}>
      <AppNavigator />
    </NavigationContainer>
  );
};
