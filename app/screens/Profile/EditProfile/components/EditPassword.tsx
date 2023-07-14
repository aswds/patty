import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { FontFamily } from "../../../../../assets/fonts/Fonts";
import Button from "../../../../shared/Buttons/Button";
import { colors } from "../../../../src/colors";

interface EditPasswordProps {
  onPress: () => void;
  title: React.ReactNode;
}

export default function EditPassword({ onPress, title }: EditPasswordProps) {
  return (
    <>
      {title}
      <View style={styles.userPasswordContainer}>
        <Text style={styles.textInput} numberOfLines={1}>
          *****
        </Text>

        <Button
          text={"Change password"}
          //@ts-ignore
          style={{ backgroundColor: "transparent", width: null }}
          onPress={onPress}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  userPasswordContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textInput: {
    fontFamily: FontFamily.regular,
    borderBottomWidth: 1,
    color: colors.text,
    paddingVertical: 5,
    height: 40,
    flexShrink: 1,
    fontSize: 25,
  },
});
