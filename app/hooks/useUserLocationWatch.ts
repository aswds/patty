import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
export const useUserLocationWatch = () => {
  const [currentUserLocation, setCurrentUserLocation] =
    useState<Location.LocationObjectCoords>();
  useEffect(() => {
    const _getLocationAsync = async () => {
      let { status } = await Location.getForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("To use program properly you need to allow location");
      }
      let locations = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.Balanced,
          distanceInterval: 30,
        },
        (loc) => {
          setCurrentUserLocation(loc.coords);
        }
      );
    };
    _getLocationAsync();
  }, []);
  return currentUserLocation;
};
