import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { colors } from "../../../../src/colors";
import { FontFamily } from "../../../../../assets/fonts/Fonts";
import { Title } from "../../../../shared/Title/Title";
import Button from "../../../../shared/Buttons/Button";
import { ProfileNavigationProps } from "../../../../Types/ProfileStack/ScreenNavigationProps";
import { useNavigation } from "@react-navigation/native";

interface EditUserBioProps {
  userBio?: string;
  onPress: () => void;
  title: React.ReactNode;
}

export default function EditUserBio({
  userBio,
  onPress,
  title,
}: EditUserBioProps) {
  return (
    <>
      {title}
      <View style={styles.userBioContainer}>
        <Text
          style={{
            ...styles.textInput,
            color: userBio ? colors.text : colors.text_2,
          }}
          numberOfLines={1}
        >
          {userBio ?? `Seems nothing here `}
        </Text>

        <Button
          text={userBio ? "Change bio" : "Add bio"}
          style={{ backgroundColor: "transparent" }}
          onPress={onPress}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  userBioContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textInput: {
    fontFamily: FontFamily.regular,
    borderBottomWidth: 1,
    borderBottomColor: colors.text_2,
    paddingVertical: 5,
    height: 40,
    flexShrink: 1,
  },
});
