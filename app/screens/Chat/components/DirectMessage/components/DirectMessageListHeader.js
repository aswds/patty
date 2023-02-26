import React from "react";

import {Image, StyleSheet, Text, View} from "react-native";
import {colors} from "../../../../../src/colors";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {BackButton} from "../../../../../shared/Buttons/BackButton";
import {useNavigation} from "@react-navigation/native";
import {FontFamily} from "../../../../../../assets/fonts/Fonts";

const DirectMessageListHeader = ({ user }) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  function UserName() {
    return (
      <View style={{ maxWidth: "65%" }}>
        <Text style={styles.userNameTextStyle} numberOfLines={1}>
          {user?.name ?? "Bobby"}
        </Text>
        <Text style={styles.userUsernameTextStyle} numberOfLines={1}>
          {user?.username ?? "@bobby"}
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top + 10 }]}>
      <BackButton
        navigation={navigation}
        style={styles.backButtonStyle}
        iconColor={colors.accentColor}
      />
      <UserName />
      <View style={styles.imageContainer}>
        <Image
          source={require("../../../../../../assets/images/noImage-01.png")}
          style={styles.imageStyle}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  backButtonStyle: {
    position: "relative",
    margin: 0,
    padding: 0,
    height: null,
    top: 0,
    left: 0,
    backgroundColor: null,
  },
  userNameTextStyle: {
    textAlign: "center",
    fontFamily: FontFamily.bold,
    fontSize: 20,
    color: colors.text,
  },
  userUsernameTextStyle: {
    fontFamily: FontFamily.bold,
    color: colors.text_2,
    textAlign: "center",
    fontSize: 13,
  },
  imageContainer: { height: 45, aspectRatio: 1 },
  imageStyle: { width: "100%", height: "100%", borderRadius: 999 },
});

export default DirectMessageListHeader;
