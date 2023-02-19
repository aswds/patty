import { useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { colors } from "../../../src/colors";
import Button from "../components/Button";
import EditImage from "./components/EditImage";
import EditName from "./components/EditName";
import EditUserBio from "./components/EditUserBio";

export default function EditProfile(props) {
  const route = useRoute();
  const user = route.params?.user;
  const { image } = route.params?.image;
  const [editedUser, setEditedUser] = useState({
    ...user,
  });
  const onPress = () => {};
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={{ flex: 1 }}>
          <View style={styles.imageContainer}>
            <EditImage source={image} />
            <Button
              onPress={onPress}
              text="Done"
              style={{
                alignSelf: "flex-end",
                backgroundColor: colors.doneButtonBG,
              }}
              textStyled={{ color: colors.doneButtonText }}
            />
          </View>

          <EditName user={user} />
          <EditUserBio user={user} />
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
  imageContainer: {
    width: "100%",
    justifyContent: "space-between",
    alignItems: "flex-end",
    flexDirection: "row",
    marginBottom: "5%",
  },
});
