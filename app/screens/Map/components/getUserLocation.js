import React from "react";
import * as Location from "expo-location";
import { Alert } from "react-native";

export async function getUserLocation() {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    Alert.alert("Permission to access location was denied");
    rej();
  }

  let location = await Location.getCurrentPositionAsync();
  return location.coords;
}
