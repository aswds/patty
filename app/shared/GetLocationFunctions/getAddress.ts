import { IFullAddress } from "../../Types/Events";

export async function getAddress(
  latitude: number,
  longitude: number
): Promise<IFullAddress | null> {
  try {
    const location = {
      latitude,
      longitude,
    };
    const address = await fetch(
      `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${latitude}%2C${longitude}&lang=en-US&apiKey=t5B5wwA5DV5PQIEflTT-w8zczmupP7qx3FDhKopVkOM`
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
