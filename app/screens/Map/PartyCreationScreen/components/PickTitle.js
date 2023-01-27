import React, { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { colors } from "../../../../src/colors";
import { Title } from "./TagList";
import { Feather } from "@expo/vector-icons";

export default function PickTitle({ setTitle }) {
  const [editing, setEditing] = useState(true);
  const styles = makeStyle(editing);
  return (
    <>
      <Title
        title={"Title"}
        icon={
          <Feather
            name="edit-2"
            size={20}
            color={colors.iconColor}
            style={{ paddingBottom: 5, paddingLeft: 5 }}
          />
        }
      />

      <View style={styles.container}>
        <TextInput
          placeholder="Choose a title"
          placeholderTextColor={colors.iconColor}
          style={styles.inputField}
          onEndEditing={() => setEditing(false)}
          onTouchStart={() => setEditing(true)}
          onChangeText={(text) => {
            setTitle(text);
          }}
          maxLength={35}
        />
      </View>
    </>
  );
}
const makeStyle = (isEditing) => {
  return StyleSheet.create({
    container: {
      width: isEditing ? "50%" : null,
      maxHeight: 50,
      backgroundColor: isEditing ? colors.input : null,
      borderRadius: 50,
      marginBottom: "5%",
    },
    inputField: {
      padding: isEditing ? 10 : 0,
      color: "white",
      width: "100%",
      height: "100%",
      borderRadius: 50,
      fontSize: isEditing ? 15 : 23,
      fontFamily: "WorkSans-Bold",
    },
  });
};
