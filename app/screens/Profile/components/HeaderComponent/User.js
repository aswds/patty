import React, { useState } from "react";
import { Image, View, Text, StyleSheet, ActivityIndicator } from "react-native";
import EditButton from "./EditButton";
export default function User({ user, setIsLoading }) {
  return (
    <>
      <View
        style={{
          height: "50%",
          width: "100%",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Image
          source={{
            uri: "https://firebasestorage.googleapis.com/v0/b/patty-9be57.appspot.com/o/user_images%2FXLs2KPd0QKfO4oJLGgdtlA5tlI83?alt=media&token=e8d926b8-fc01-490e-8b0b-a6f6028816f5",
          }}
          style={styles.imageStyle}
          onLoadStart={() => {
            setIsLoading(true);
          }}
          onLoadEnd={() => {
            setIsLoading(false);
          }}
        />
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
  imageStyle: {
    borderRadius: 100,
    height: "100%",
    aspectRatio: 1,
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
