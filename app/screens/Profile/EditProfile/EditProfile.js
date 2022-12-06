import React from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import UserName from "../components/HeaderComponent/UserName";
import UserBio from "../components/HeaderComponent/UserBio";
import UserFollowers from "../components/HeaderComponent/UserFollowers";
import { colors } from "../../../src/colors";
import UserImage from "../components/HeaderComponent/UserImage";
import EditImage from "./components/EditImage";
import EditName from "./components/EditName";
export default function EditProfile(props) {
  const route = useRoute();
  const user = route.params?.user;

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback
        style={{ backgroundColor: "blue" }}
        onPress={() => Keyboard.dismiss()}
      >
        <View style={{ flex: 1 }}>
          <EditImage uri={user.userImage} />
          <EditName user={user} />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: "5%",
    paddingTop: "10%",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: colors.background,
    flex: 1,
  },
});
