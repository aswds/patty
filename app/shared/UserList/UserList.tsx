import React, { useState } from "react";
import { FlatList, FlatListProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import UserListHeader from "./UserListHeader";
import { IUser } from "../../Types/User";
import ListEmptyComponent from "./ListEmptyComponent";
import ListLoader from "../Loaders/ListLoader";
import { Fontisto } from "@expo/vector-icons";
import { colors } from "../../src/colors";

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
          <ListEmptyComponent
            title="It looks like there's no one here"
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
