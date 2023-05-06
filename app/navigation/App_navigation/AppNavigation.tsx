import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";
import React, { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import store from "../../redux/store/store";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AppNavigator } from "./AppNavigator";
import { getUserLocation } from "../../shared/GetLocationFunctions/getUserLocation";
import { getAddress } from "../../shared/GetLocationFunctions/getAddress";
import { IFullAddress } from "../../Types/Events";
import { updateUserLocation } from "../../redux/reducers/User";

/**
 * Providing redux store for app
 * */

export const App_Navigation = () => {
  const navigation = useNavigationContainerRef();
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchUserLocation() {
      await getUserLocation().then(async (res) => {
        await getAddress(res.coords.latitude, res.coords.longitude).then(
          (r: IFullAddress) => {
            console.log("SUCCESS:" + r.city);

            dispatch(
              updateUserLocation({
                city: r?.city,
                location: {
                  latitude: res.coords.latitude,
                  latitudeDelta: 0,
                  longitude: res.coords.longitude,
                  longitudeDelta: -0.01,
                },
              })
            );
          }
        );
      });
    }
    fetchUserLocation();
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer ref={navigation}>
        <AppNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
