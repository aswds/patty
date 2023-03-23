import { IFullAddress } from "../../Types/Events";

const HERE_API_KEY = "1PKrIQtOybgseK4vquZR4lsHXlVpCASICK1Zg436Nwk";

export function getAddress(
  latitude: number,
  longitude: number
): Promise<IFullAddress> {
  console.log(latitude, longitude);
  return new Promise(async (resolve, reject) => {
    const url = `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${latitude}%2C${longitude}&lang=en-US&apiKey=${HERE_API_KEY}`;
    await fetch(url)
      .then((res) => res.json())
      .then((resJson) => {
        console.log();
        if (resJson.items) {
          console.log(resJson.items[0].address);

          resolve(resJson.items[0].address as IFullAddress);
        } else {
          reject({ message: "Please, pick other location", payload: false });
        }
      })
      .catch((e) => {
        reject({ message: e, payload: false });
      });
  });
}
