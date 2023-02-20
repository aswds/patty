import { IFullAddress } from "../../Types/Type";

const HERE_API_KEY = "1PKrIQtOybgseK4vquZR4lsHXlVpCASICK1Zg436Nwk";

export function getAddress(
  latitude: number,
  longitude: number
): Promise<IFullAddress> {
  return new Promise((resolve, reject) => {
    const url = `https://reverse.geocoder.ls.hereapi.com/6.2/reversegeocode.json?apiKey=${HERE_API_KEY}&mode=retrieveAddresses&prox=${latitude},${longitude}`;
    fetch(url)
      .then((res) => res.json())
      .then((resJson) => {
        if (
          resJson &&
          resJson.Response &&
          resJson.Response.View &&
          resJson.Response.View[0] &&
          resJson.Response.View[0].Result &&
          resJson.Response.View[0].Result[0]
        ) {
          resolve(
            resJson.Response.View[0].Result[0].Location.Address as IFullAddress
          );
        } else {
          reject({ message: "Please, pick other location", payload: false });
        }
      })
      .catch((e) => {
        reject({ message: e, payload: false });
      });
  });
}
