import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { isAndroid } from "../../../src/platform";
import { FontFamily } from "../../../../assets/fonts/Fonts";
import { IUserEvents } from "../../../Types/User";
import Loader from "../../../shared/Loaders/Loader";
import { colors } from "../../../src/colors";

interface RenderItemProps {
  events: IUserEvents;
}

export default function RenderItem({ events }: RenderItemProps): JSX.Element {
  if (events === undefined) {
    return <Loader isVisible={events} />;
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.textNumberStyle}>{events?.eventsCreated} 🎉</Text>
      </View>
      <View>
        <Text style={styles.textStyle}>Parties were created</Text>
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
    backgroundColor: colors.input,
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
    color: colors.text,
    fontSize: 20,
  },
  textStyle: {
    color: colors.text,
    fontFamily: FontFamily.medium,
  },
  textStyleUsername: {
    color: colors.text,
    fontFamily: FontFamily.bold,
  },
});
