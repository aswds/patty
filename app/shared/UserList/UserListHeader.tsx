import React from "react";

import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { isAndroid } from "../../src/platform";
import { colors } from "../../src/colors";
import SearchBar from "./SearchBar";
import { BackButton } from "../Buttons/BackButton";
import { useNavigation } from "@react-navigation/native";
import { MapNavigationProps } from "../../Types/MapStack/ScreenNavigationProps";

const UserListHeader = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<MapNavigationProps>();
  return (
    <LinearGradient
      style={{
        paddingTop: isAndroid ? 10 : 0,
        paddingBottom: 10,
      }}
      colors={["transparent"]}
    >
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <BackButton
          navigation={navigation}
          style={styles.backButtonStyle}
          iconColor={colors.accentColor}
        />
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
  container: {
    alignSelf: "center",
    alignItems: "center",
    flexDirection: "row",
    width: "90%",
    justifyContent: "center",
  },
  editGroupStyle: {
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    aspectRatio: 1,
    overflow: "hidden",
  },
  backButtonStyle: {
    position: "relative",
    left: 0,
    backgroundColor: "transparent",
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
export default UserListHeader;
