import React, { useCallback, useEffect, useState } from "react";
import UserList from "../../../../shared/UserList/UserList";
import { useFocusEffect } from "@react-navigation/native";
import { IUser } from "../../../../Types/User";
import Screen from "../components/Screen";
import { fetchGuests } from "../fetchGuests";
import { GuestsScreenNavigationProps } from "../../../../Types/MapStack/ScreenNavigationProps";
import UserItem from "../../../../shared/UserList/UserItem";

export default function Guests({
  route,
  navigation,
}: GuestsScreenNavigationProps) {
  const [guestsUIDs, _] = useState<string[]>(route.params?.guests);
  const [guests, setGuests] = useState<IUser[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);
      if (guestsUIDs.length > 0) {
        fetchGuests(guestsUIDs).then((guests) => {
          setGuests(guests);
          setIsLoading(false);
        });
      }
    }, [])
  );
  return (
    <Screen>
      <UserList
        isLoading={isLoading}
        data={guests}
        renderItem={({ item, index }) => <UserItem _user={item} key={index} />}
        keyExtractor={(item, index) => item.uid!}
      />
    </Screen>
  );
}
