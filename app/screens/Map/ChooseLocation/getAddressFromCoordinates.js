export function getAddressFromCoordinates(latitude, longitude) {
  return new Promise((resolve) => {
    // 1PKrIQtOybgseK4vquZR4lsHXlVpCASICK1Zg436Nwk
    //  https://revgeocode.search.hereapi.com/v1/
    //   revgeocode
    //   ?at=48.2181679%2C16.3899064
    //   &lang=en-US
    //   &apiKey={YOUR_API_KEY}
    const url_1 = `https://revgeocode.search.hereapi.com/v1/
    revgeocode
    ?at=${latitude}%2C${longitude}
    &lang=en-US
    &apiKey=1PKrIQtOybgseK4vquZR4lsHXlVpCASICK1Zg436Nwk`;
    const url = `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${latitude},${longitude}&apiKey=1PKrIQtOybgseK4vquZR4lsHXlVpCASICK1Zg436Nwk`;
    fetch(url)
      .then((res) => res.json())
      .then((resJson) => {
        // the response had a deeply nested structure :/
        const {
          countryCode,
          countryName,
          city,
          district,
          street,
          postalCode,
          houseNumber,
          county,
        } = resJson.items[0].address;
        if (resJson.items) {
          const InfoAddress: IAddress = {
            countryCode,
            countryName,
            county,
            city,
            district,
            street,
            postalCode,
            houseNumber: houseNumber || null,
          };
          resolve(InfoAddress);
        } else {
          resolve(resJson);
        }
      })
      .catch((e) => {
        console.log("Error in getAddressFromCoordinates", e);
        resolve();
      });
  });
}
