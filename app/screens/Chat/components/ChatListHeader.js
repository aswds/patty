import React from "react";

import {StyleSheet, View} from "react-native";
import SearchBar from "./SearchBar";
import {colors} from "../../../src/colors";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {LinearGradient} from "expo-linear-gradient";
import {isAndroid} from "../../../src/platform";

const ChatListHeader = () => {
  const insets = useSafeAreaInsets();
  return (
    <LinearGradient
      style={{
        paddingTop: isAndroid ? 10 : 0,
        paddingBottom: 10,
      }}
      colors={[colors.background, "transparent"]}
    >
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <SearchBar
          containerStyle={styles.inputContainer}
          inputStyle={styles.inputStyle}
          placeholder={"Search"}
          placeholderTextColor={colors.iconColor}
        />
        {/*<TouchableOpacity style={styles.editGroupStyle}>*/}
        {/*  <Feather name="edit" size={30} color={colors.accentColor} />*/}
        {/*</TouchableOpacity>*/}
      </View>
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  editGroupStyle: {
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    aspectRatio: 1,
    overflow: "hidden",
  },
  container: {
    alignSelf: "center",
    alignItems: "center",
    flexDirection: "row",
    width: "90%",
    justifyContent: "center",
  },
  inputContainer: {
    backgroundColor: colors.input,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    flex: 1,
    overflow: "hidden",
  },
  inputStyle: {
    flex: 1,
    color: "white",
  },
});
export default ChatListHeader;
