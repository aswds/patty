import React, { useCallback, useState } from "react";
import UserList from "../../../../shared/UserList/UserList";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import { GuestsScreenRouteProps } from "../../../../Types/MapStack/RouteTypes";
import { IUser } from "../../../../Types/User";
import Screen from "../components/Screen";
import { fetchGuests } from "../fetchGuests";

export default function Guests() {
  const route = useRoute<GuestsScreenRouteProps>();
  const [guestsUIDs, _] = useState<string[]>(route.params?.guests);
  const [guests, setGuests] = useState<IUser[]>();
  useFocusEffect(
    useCallback(() => {
      if (guestsUIDs.length > 0) {
        fetchGuests(guestsUIDs).then((guests) => {
          setGuests(guests);
        });
      }
    }, [])
  );

  return (
    <Screen>
      <UserList data={guests} />
    </Screen>
  );
}
