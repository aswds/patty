import React from "react";
import { FlatList } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import UserListHeader from "./UserListHeader";
import UserItem from "./UserItem";
import { IUser } from "../../Types/User";
import ListEmptyComponent from "./ListEmptyComponent";

interface UserListProps {
  data?: IUser[];
}

const UserList = ({ data }: UserListProps) => {
  const insets = useSafeAreaInsets();

  return (
    <FlatList
      ListHeaderComponent={UserListHeader}
      stickyHeaderIndices={[0]}
      data={data}
      keyExtractor={(item) => item.uid!}
      renderItem={({ item }) => <UserItem _user={item} />}
      contentContainerStyle={{
        paddingBottom: insets.bottom + 110,
      }}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={<ListEmptyComponent />}
    />
  );
};

export default UserList;
