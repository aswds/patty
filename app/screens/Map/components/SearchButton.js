import React from "react";
import { Callout } from "react-native-maps";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
} from "react-native";
import { FontAwesome, AntDesign, Ionicons } from "@expo/vector-icons";
import { colors } from "../../../src/colors";
const isAndroid = Platform.OS == "android";

export default function SearchButton(props) {
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
          <Ionicons name="search" size={"35%"} color={colors.mapAccentColor} />
          {/* <FontAwesome
            name="search"
            size={"30%"}
            color={colors.mapAccentColor}
          /> */}
        </TouchableOpacity>
      </SafeAreaView>
    </Callout>
  );
}

const styles = StyleSheet.create({
  button: {
    height: "70%",
    aspectRatio: 1,
    backgroundColor: "white",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  containerButton: {
    top: "10%",
    right: 0,
    width: "30%",
    alignSelf: "flex-end",
    height: isAndroid ? "15%" : "10%",
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  textStyle: {
    color: "white",
    fontFamily: "WorkSans-Bold",
  },
});
