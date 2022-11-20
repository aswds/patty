import React from "react";
import { Callout } from "react-native-maps";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
} from "react-native";
import { colors } from "../../../src/colors";
const isAndroid = Platform.OS == "android";

export default function DoPartyButton(props) {
  const { onPress } = props;
  return (
    <Callout style={styles.containerButton}>
      <SafeAreaView
        style={{
          flex: 1,
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={onPress}
        >
          <Text style={styles.textStyle}>Throw a party</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </Callout>
  );
}

const styles = StyleSheet.create({
  button: {
    height: "50%",
    width: "80%",
    backgroundColor: colors.mapAccentColor,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  containerButton: {
    bottom: "15%",
    width: "50%",
    alignSelf: "center",
    height: isAndroid ? "15%" : "10%",
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  textStyle: {
    color: "white",
    fontFamily: "WorkSans-Bold",
    fontSize: 13,
  },
});
