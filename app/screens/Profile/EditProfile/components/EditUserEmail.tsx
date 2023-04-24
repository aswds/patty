import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Title } from "../../../../shared/Title/Title";
import { IUser } from "../../../../Types/User";
import { FontFamily } from "../../../../../assets/fonts/Fonts";
import { useNavigation } from "@react-navigation/native";
import { ProfileNavigationProps } from "../../../../Types/ProfileStack/ScreenNavigationProps";
import Button from "../../../../shared/Buttons/Button";
import { colors } from "../../../../src/colors";
import { hideEmailBeforeAt } from "../../../../services/hideEmailAt";

interface EditUserEmailProps {
  email: IUser["email"];
  title: React.ReactNode;
}
const EditUserEmail = ({ email, title }: EditUserEmailProps) => {
  const navigation = useNavigation<ProfileNavigationProps>();
  return (
    <>
      {title}

      <View style={styles.container}>
        <Text style={styles.email}>{hideEmailBeforeAt(email!)}</Text>
        <Button
          onPress={() => {
            navigation.navigate("ProfileNav", {
              screen: "ChangeEmail",
              params: {},
            });
          }}
          text="Change email"
          style={{
            width: undefined,
            paddingHorizontal: 10,
            backgroundColor: "transparent",
          }}
        />
      </View>
    </>
  );
};

export default EditUserEmail;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  email: {
    fontFamily: FontFamily.bold,
    fontSize: 15,
    color: colors.text,
  },
});
