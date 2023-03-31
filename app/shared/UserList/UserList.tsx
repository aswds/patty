import React, { useState } from "react";
import { FlatList, FlatListProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import UserListHeader from "./UserListHeader";
import UserItem from "./UserItem";
import { IUser } from "../../Types/User";
import ListEmptyComponent from "./ListEmptyComponent";
import { useFocusEffect } from "@react-navigation/native";

interface UserListProps extends FlatListProps<IUser> {}

const UserList = ({ ...flatlistProps }: UserListProps) => {
  const insets = useSafeAreaInsets();
  useFocusEffect(() => {});
  return (
    <FlatList
      ListHeaderComponent={UserListHeader}
      stickyHeaderIndices={[0]}
      contentContainerStyle={{
        paddingBottom: insets.bottom + 110,
      }}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={
        <ListEmptyComponent title="It looks like there's no one here" />
      }
      {...flatlistProps}
    />
  );
};

export default UserList;
