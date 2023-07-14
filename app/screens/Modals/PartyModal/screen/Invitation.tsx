import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { StyleSheet } from "react-native";
import { MapStackScreenProps } from "../../../../Types/MapStack/ScreenNavigationProps";
import { IUser } from "../../../../Types/User";
import UserItem from "../../../../shared/UserList/UserItem";
import UserList from "../../../../shared/UserList/UserList";
import { fetchUsers } from "../../../../shared/UserList/fetchGuests";
import { colors } from "../../../../src/colors";
const Invitation = ({
  navigation,
  route,
}: MapStackScreenProps<"InvitationScreen">) => {
  const [userUIDs, _] = useState<string[] | undefined>(route.params?.users);
  const [users, setUsers] = useState<IUser[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);
      if (userUIDs && userUIDs?.length > 0) {
        fetchUsers(userUIDs)
          .then((users) => {
            setUsers(users);
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
    <UserList
      isLoading={isLoading}
      users={users}
      headerTitle="Invitation"
      style={{ backgroundColor: colors.background }}
      renderItem={({ item, index }) => (
        <UserItem _user={item} key={index} showInviteButton />
      )}
    />
  );
};

export default Invitation;

const styles = StyleSheet.create({});
