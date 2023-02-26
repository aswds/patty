import React from "react";
import {Dimensions, StyleSheet, Text, View} from "react-native";
import {isAndroid} from "../../../src/platform";
import {FontFamily} from "../../../../assets/fonts/Fonts";

export default function RenderItem(props) {
  const { item } = props;
  const user_info = item.item;
  if (user_info === undefined) {
    return;
  }
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.textNumberStyle}>128 🎉</Text>
      </View>
      <View>
        <Text style={styles.textStyle}>
          Parties{" "}
          <Text style={styles.textStyleUsername}>{user_info.username}</Text> has
          visited{" "}
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
