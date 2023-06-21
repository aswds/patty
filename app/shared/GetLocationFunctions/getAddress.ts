import { IFullAddress } from "../../Types/Events";
import { reverseGeocodeAsync } from "expo-location";

export async function getAddress(
  latitude: number,
  longitude: number
): Promise<IFullAddress | null> {
  try {
    const location = {
      latitude,
      longitude,
    };

    const address = await reverseGeocodeAsync(location);

    if (address.length > 0) {
      return address[0];
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}
