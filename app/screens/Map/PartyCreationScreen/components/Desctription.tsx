import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { Title } from "../../../../shared/Title/Title";
import { Entypo } from "@expo/vector-icons";
import { colors } from "../../../../src/colors";
import { descriptionTexts } from "../descriptionTexts";
import { FontFamily } from "../../../../../assets/fonts/Fonts";

interface DescriptionProps {
  setDescription: (text: string) => void;
  description: string | undefined;
}

export default function Description({
  setDescription,
  description,
}: DescriptionProps) {
  return (
    <>
      <Title
        title={"Description"}
        icon={
          <Entypo
            name="list"
            size={20}
            color={colors.iconColor}
            style={{ paddingLeft: 5 }}
          />
        }
        description={descriptionTexts.description}
      />

      <View style={styles.container}>
        <TextInput
          keyboardAppearance={"dark"}
          placeholder="Write here"
          placeholderTextColor={colors.iconColor}
          style={[styles.inputField]}
          onChangeText={(text) => {
            setDescription(text);
          }}
          maxLength={250}
          multiline
          defaultValue={description}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    maxHeight: 100,
    backgroundColor: colors.input,
    borderRadius: 10,
    marginBottom: "5%",
  },
  inputField: {
    paddingTop: "5%",
    paddingLeft: "5%",
    paddingBottom: "5%",
    paddingRight: "5%",
    color: "white",
    width: "100%",
    height: "100%",
    fontSize: 15,
    fontFamily: FontFamily.medium,
  },
});
