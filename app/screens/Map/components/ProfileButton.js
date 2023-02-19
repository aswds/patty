import React from "react";

import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";

// Button to navigate to profile screen
const ProfileButton = () => {
  const userImage = useSelector((state) => state.user_state.userImage);
  return (
    <TouchableOpacity style={styles.container}>
      <Image source={userImage} />
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    top: 200,
    height: 50,
    position: "absolute",
    backgroundColor: "yellow",
  },
});
export default ProfileButton;
