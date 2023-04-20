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
}

export default function EditUserBio({ userBio }: EditUserBioProps) {
  const [bio, setBio] = useState<string | undefined>(userBio);
  const [borderBottomWidth, setBorderBottomWidth] = useState<number>(1);
  const navigation = useNavigation<ProfileNavigationProps>();
  return (
    <View style={styles.userBioContainer}>
      <Text
        style={{
          ...styles.textInput,
          color: userBio ? colors.text : colors.text_2,
        }}
      >
        {userBio ?? `Seems nothing here `}
      </Text>

      <Button
        text={userBio ? "Change bio" : "Add bio"}
        style={{ backgroundColor: "transparent" }}
        onPress={() =>
          navigation.navigate("ProfileNav", {
            screen: "ChangeBio",
            params: {
              bio: userBio,
              showModal: false,
              unsavedChanges: false,
            },
          })
        }
      />
    </View>
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
  },
});
