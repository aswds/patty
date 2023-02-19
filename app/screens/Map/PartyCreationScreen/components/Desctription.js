import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { Title } from "./TagList";
import { Entypo } from "@expo/vector-icons";
import { colors } from "../../../../src/colors";

export default function Description({ setDescription, description }) {
  return (
    <View>
      <Title
        title={"Description"}
        icon={
          <Entypo
            name="list"
            size={20}
            color={colors.iconColor}
            style={{ paddingBottom: 5, paddingLeft: 5 }}
          />
        }
      />

      <View style={styles.container}>
        <TextInput
          keyboardAppearance={"dark"}
          placeholder="Provide information about your party"
          placeholderTextColor={colors.iconColor}
          style={[styles.inputField]}
          onChangeText={(text) => {
            setDescription(text);
          }}
          maxLength={150}
          multiline
          defaultValue={description}
        />
      </View>
    </View>
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
    padding: 10,
    color: "white",
    width: "100%",
    height: "100%",
    fontSize: 15,
    fontFamily: "WorkSans-Medium",
  },
});
