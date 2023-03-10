import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { colors } from "../../../../src/colors";
import { Feather } from "@expo/vector-icons";
import { Title } from "../../../../shared/Title/Title";
import { descriptionTexts } from "../descriptionTexts";
import { FontFamily } from "../../../../../assets/fonts/Fonts";

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
        description={descriptionTexts.title}
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
    height: 50,
    marginBottom: "5%",
  },
  inputField: {
    width: "100%",
    color: colors.text,
    height: "100%",
    borderRadius: 15,
    padding: 10,

    backgroundColor: colors.input,
    fontSize: 17,
    fontFamily: FontFamily.bold,
    // textAlign: "flex-start",
  },
});
