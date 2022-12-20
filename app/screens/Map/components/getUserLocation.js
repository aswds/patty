import React, { useState, useEffect } from "react";
import * as Location from "expo-location";
import { Alert } from "react-native";

export async function getUserLocation() {
  return new Promise(async (res, rej) => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      rej();
    }

    let location = await Location.getCurrentPositionAsync({});
    await res(location.coords);
  });
}
