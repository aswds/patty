import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { colors } from "../../../../src/colors";
import { Title } from "./TagList";
import { Feather } from "@expo/vector-icons";

export default function PickTitle({ setTitle, title }) {
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
          keyboardAppearance={"dark"}
          placeholder="Pick a title"
          placeholderTextColor={colors.iconColor}
          style={styles.inputField}
          // onEndEditing={() => setEditing(false)}
          // onTouchStart={() => setEditing(true)}
          onChangeText={(text) => {
            setTitle(text);
          }}
          maxLength={35}
          defaultValue={title}
        />
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "4%",
    marginBottom: "5%",
  },
  inputField: {
    width: "50%",
    color: colors.text,
    height: "100%",
    borderRadius: 50,
    padding: 10,

    backgroundColor: colors.input,
    fontSize: 20,
    fontFamily: "WorkSans-Bold",
    textAlign: "flex-start",
  },
});
