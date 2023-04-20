import React, { useState } from "react";
import { FlatList, FlatListProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import UserListHeader from "./UserListHeader";
import { IUser } from "../../Types/User";
import ListEmptyComponent from "./ListEmptyComponent";
import ListLoader from "../Loaders/ListLoader";

interface UserListProps extends FlatListProps<IUser> {
  isLoading: boolean;
}

const UserList = ({ isLoading, ...flatlistProps }: UserListProps) => {
  const insets = useSafeAreaInsets();
  return (
    <FlatList
      ListHeaderComponent={UserListHeader}
      stickyHeaderIndices={[0]}
      contentContainerStyle={{
        paddingBottom: insets.bottom + 110,
      }}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={() => {
        return isLoading ? (
          <ListLoader />
        ) : (
          <ListEmptyComponent title="It looks like there's no one here" />
        );
      }}
      {...flatlistProps}
    />
  );
};

export default UserList;
