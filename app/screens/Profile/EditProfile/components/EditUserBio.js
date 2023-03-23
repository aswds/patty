import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

export default function EditUserBio({ user }) {
  return (
    <View style={styles.userBioContainer}>
      <TextInput defaultValue={user?.bio} placeholder="Add your bio" />
    </View>
  );
}

const styles = StyleSheet.create({
  userBioContainer: {},
});
