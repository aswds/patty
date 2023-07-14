import { Fontisto } from "@expo/vector-icons";
import _ from "lodash";
import { useEffect, useState } from "react";
import { FlatList, FlatListProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { IUser } from "../../Types/User";
import { colors } from "../../src/colors";
import ListLoader from "../Loaders/ListLoader";
import ListEmptyComponent from "./ListEmptyComponent";
import UserListHeader from "./UserListHeader";
interface UserListProps extends Omit<FlatListProps<IUser>, "data"> {
  isLoading: boolean;
  users: IUser[];
  headerTitle?: string;
}

const UserList = ({
  isLoading,
  users,
  headerTitle,
  ...flatlistProps
}: UserListProps) => {
  const insets = useSafeAreaInsets();
  const [data, setData] = useState(users);

  useEffect(() => {
    setData(users);
  }, [users]);

  function filterUsers(
    name: IUser["name"],
    username: IUser["username"],
    formatQuery: string
  ) {
    if (
      name.toLowerCase().includes(formatQuery) ||
      username.toLowerCase().includes(formatQuery)
    )
      return true;
    return false;
  }

  function handleSearch(text: string) {
    const formatQuery = text.toLowerCase();

    const data = _.filter(users, (user) =>
      filterUsers(user.name, user.username, formatQuery)
    );
    setData(data);
  }
  function onPressClear() {
    setData(users);
  }
  return (
    <FlatList
      ListHeaderComponent={
        <UserListHeader
          headerTitle={headerTitle}
          handleSearch={handleSearch}
          onPressClear={onPressClear}
        />
      }
      stickyHeaderIndices={[0]}
      contentContainerStyle={{
        paddingBottom: insets.bottom + 110,
      }}
      data={data}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={() => {
        return isLoading ? (
          <ListLoader />
        ) : (
          <ListEmptyComponent
            title="t looks like there's no one here"
            icon={
              <Fontisto
                name="cloudy-gusts"
                size={40}
                color={colors.text}
                style={{ marginVertical: "5%" }}
              />
            }
          />
        );
      }}
      {...flatlistProps}
    />
  );
};

export default UserList;
