import React, { useState } from "react";
import { Image, View, Text, StyleSheet, ActivityIndicator } from "react-native";
import useUserImage from "../../../../hooks/useUserImage";
import EditButton from "./EditButton";
import LogOutButton from "./LogoutButton";
import UserImage from "./UserImage";
export default function User({ user, setIsLoading }) {
  const { fetchableImage } = useUserImage(user.userImage);
  return (
    <>
      <View
        style={{
          height: "45%",
          width: "100%",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <UserImage uri={user.userImage} setIsLoading={setIsLoading} />
        <LogOutButton />
        <EditButton />
      </View>

      <View style={styles.usernameContainer}>
        <Text style={styles.textStyle}>{user.username}</Text>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  textStyle: {
    color: "white",
    fontFamily: "WorkSans-Bold",
    fontSize: 15,
  },

  usernameContainer: {
    backgroundColor: "rgba(21, 21, 21, 0.6)",
    height: "15%",
    width: "30%",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
});
