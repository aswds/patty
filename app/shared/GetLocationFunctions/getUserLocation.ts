import * as Location from "expo-location";
import {LocationObject} from "expo-location";
import {Alert} from "react-native";

export async function getUserLocation(): Promise<LocationObject> {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    Alert.alert("Permission to access location was denied");
  }

  return await Location.getCurrentPositionAsync();
}
