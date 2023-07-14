import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
export const useUserLocationWatch = () => {
  const [currentUserLocation, setCurrentUserLocation] =
    useState<Location.LocationObjectCoords>();
  useEffect(() => {
    const _getLocationAsync = async () => {
      await Location.watchPositionAsync(
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
