import { BlurView } from "expo-blur";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FontFamily } from "../../../../../../assets/fonts/Fonts";
import { colors } from "../../../../../src/colors";
interface UserContainerProps {
  user: { photo?: string; name?: string; nickname?: string };
}

const UserContainer: React.FC<UserContainerProps> = ({ user }) => {
  return (
    <TouchableOpacity activeOpacity={0.7} style={styles.container}>
      <BlurView intensity={60} style={styles.userContainer} tint="dark">
        <Image source={{ uri: user?.photo }} style={styles.userPhoto} />
        <View>
          <Text style={styles.userName}>{user?.name}</Text>
          <Text style={styles.userNickname}>@{user?.nickname}</Text>
        </View>
      </BlurView>
    </TouchableOpacity>
  );
};

export default UserContainer;

const styles = StyleSheet.create({
  container: {
    flexShrink: 1,
  },

  userContainer: {
    flexDirection: "row",
    borderRadius: 20,
    padding: "3%",
    justifyContent: "center",
    overflow: "hidden",
    alignItems: "center",
  },
  userPhoto: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  userName: {
    fontFamily: FontFamily.bold,
    color: colors.text,
  },
  userNickname: {
    color: colors.text_2,
    fontFamily: FontFamily.regular,
  },
});
