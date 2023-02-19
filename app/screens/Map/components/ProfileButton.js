import React from "react";

import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../src/colors";

// Button to navigate to profile screen
const ProfileButton = () => {
  const userImage = useSelector((state) => state.user_state.userImage);
  const navigation = useNavigation();
  function onPress() {
    navigation.navigate("ProfileNav");
  }
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={userImage} style={{ height: "100%", width: "100%" }} />
      <View style={styles.iconContainer}>
        <Ionicons name="add-circle" size={40} color={colors.accentColor} />
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    position: "absolute",
    top: "5%",
    right: "5%",
    backgroundColor: "yellow",
  },
});
export default ProfileButton;
