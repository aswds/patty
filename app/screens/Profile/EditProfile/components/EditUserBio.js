import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

export default function EditUserBio({ user }) {
  return (
    <View style={styles.userBioContiner}>
      <TextInput defaultValue={user.bio} placeholder="Add your bio" />
    </View>
  );
}

const styles = StyleSheet.create({
  userBioContiner: {},
});
