import { useEffect, useState } from "react";
import * as Location from "expo-location";

const useLocationPermission = () => {
  const [status, setStatus] = useState<Location.PermissionStatus>(
    Location.PermissionStatus.UNDETERMINED
  );

  useEffect(() => {
    const getLocationPermission = async () => {
      const { status: foregroundStatus } =
        await Location.getForegroundPermissionsAsync();
      const { status: backgroundStatues } =
        await Location.getBackgroundPermissionsAsync();
      setStatus(foregroundStatus);
    };

    getLocationPermission();
  }, []);

  return status as Location.PermissionStatus;
};

export default useLocationPermission;
