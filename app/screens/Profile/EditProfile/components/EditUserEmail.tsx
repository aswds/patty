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
import BoldText from "../../../../shared/Text/BoldText";

interface EditUserEmailProps {
  email: IUser["email"];
  title: React.ReactNode;
  emailVerified?: boolean;
}
const EditUserEmail = ({ email, title, emailVerified }: EditUserEmailProps) => {
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
      {!emailVerified && (
        <View
          style={{
            width: "100%",
            marginTop: "5%",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <BoldText textStyles={{ color: colors.buttonText }}>
            Email unverified
          </BoldText>
          <Button
            onPress={() => {
              navigation.navigate("ProfileNav", {
                screen: "VerifyEmail",
              });
            }}
            text="Verify email"
            style={{
              width: undefined,
              paddingHorizontal: 10,
              backgroundColor: "transparent",
            }}
          />
        </View>
      )}
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
