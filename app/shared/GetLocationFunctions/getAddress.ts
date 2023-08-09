import { IFullAddress } from "../../Types/Events";
import Constants from "expo-constants";

const herePlatformApiKey = Constants.manifest?.extra?.herePlatformApiKey;

export async function getAddress(
  latitude: number,
  longitude: number
): Promise<IFullAddress | null> {
  try {
    const address = await fetch(
      `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${latitude}%2C${longitude}&lang=en-US&apiKey=${herePlatformApiKey}`
    ).then((res) => res.json());
    if (address.items.length > 0) {
      return address.items[0].address;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}
