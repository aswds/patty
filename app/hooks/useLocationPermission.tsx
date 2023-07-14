import { useEffect, useState } from "react";
import * as Location from "expo-location";

const useLocationPermission = () => {
  const [status, setStatus] = useState<Location.PermissionStatus>(
    Location.PermissionStatus.UNDETERMINED
  );

  useEffect(() => {
    const getLocationPermission = async () => {
      const { status } = await Location.getForegroundPermissionsAsync();
      setStatus(status);
    };

    getLocationPermission();
  }, []);

  return status as Location.PermissionStatus;
};

export default useLocationPermission;
