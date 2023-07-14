import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { GuestsScreenNavigationProps } from "../../../../Types/MapStack/ScreenNavigationProps";
import { IUser } from "../../../../Types/User";
import UserItem from "../../../../shared/UserList/UserItem";
import UserList from "../../../../shared/UserList/UserList";
import Screen from "../components/Screen";
import { fetchGuests } from "../fetchGuests";

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
        fetchGuests(guestsUIDs)
          .then((guests) => {
            setGuests(guests);
            setIsLoading(false);
          })
          .catch(() => {
            setIsLoading(false);
          });
      } else {
        setIsLoading(false);
      }
    }, [])
  );
  return (
    <Screen>
      <UserList
        isLoading={isLoading}
        users={guests}
        renderItem={({ item, index }) => <UserItem _user={item} key={index} />}
        keyExtractor={(item, index) => item.uid!}
      />
    </Screen>
  );
}
