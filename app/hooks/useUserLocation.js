import React, { useState, useEffect } from "react";

import * as Location from "expo-location";
import { getUserLocation } from "../screens/Map/components/getUserLocation";

export default function useUserLocation() {
  const [userLocation, setUserLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setIsLoading] = useState();

  useEffect(() => {
    getUserLocation().then((res) => {
      setUserLocation({
        latitude: res.latitude,
        latitudeDelta: 0,
        longitude: res.longitude,
        longitudeDelta: -0.01,
      }),
        setIsLoading(false);
    });
  }, []);
  return { userLocation, errorMsg, isLoading };
}
