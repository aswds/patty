import React from "react";
import Creators from "./components/Creators";
import Screen from "./components/Screen";

export default function PartyCreationScreen({}) {
  // const { region, address, fullAddressInfo, userLocation } = route.params;

  let data = {
    // title: title,
    // description: description,
    // tags: tags,
    // location: { region, address, fullAddressInfo },
    // time: time,
    // access: access,
    number_of_guests: 1,
  };
  return (
    <Screen>
      <Creators />
    </Screen>
  );
}
