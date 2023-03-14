import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { isAndroid } from "../../../src/platform";
import { FontFamily } from "../../../../assets/fonts/Fonts";
import { IUser } from "../../../Types/User";
import Loader from "../../../shared/Loaders/Loader";

interface RenderItemProps {
  user: Pick<IUser, "username" | "eventsCreated">;
}

export default function RenderItem({ user }: RenderItemProps): JSX.Element {
  const user_info = user;
  if (user_info === undefined) {
    return <Loader isVisible={user_info} />;
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.textNumberStyle}>{user_info.eventsCreated} 🎉</Text>
      </View>
      <View>
        <Text style={styles.textStyle}>
          Parties were created by{" "}
          <Text style={styles.textStyleUsername}>{user_info.username}</Text>
        </Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "90%",
    height: isAndroid
      ? Dimensions.get("window").height * 0.2
      : Dimensions.get("window").height * 0.15,
    backgroundColor: "#1E1E1E",
    shadowOffset: { height: 4, width: 0 },
    shadowOpacity: 1,
    shadowRadius: 2,
    margin: 10,
    shadowColor: isAndroid ? "white" : "rgba(0, 0, 0, 0.7)",
    borderRadius: 45,
    elevation: 5,
  },
  textNumberStyle: {
    fontFamily: FontFamily.bold,
    color: "white",
    fontSize: 20,
  },
  textStyle: {
    color: "white",
    fontFamily: FontFamily.medium,
  },
  textStyleUsername: {
    color: "white",
    fontFamily: FontFamily.bold,
  },
});
