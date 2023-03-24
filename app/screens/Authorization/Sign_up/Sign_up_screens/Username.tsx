import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { colors } from "../../../../src/colors";
import { BackButton } from "../../../../shared/Buttons/BackButton";
import Input from "../../../../shared/Input/Input";
import { NMScreen } from "./components/NameModalComp/NMScreen";
import AskUsername from "./components/Username/AskUsername";
import NextButton from "./components/Username/NextButton";
import { sameUsernames } from "./Sign_up_Functions/sameUsername";
import { text_modifier } from "./Sign_up_Functions/text_modifier";
import { FontFamily } from "../../../../../assets/fonts/Fonts";
import { UsernameNavigationProps } from "../../../../Types/Authorization/SignUp/ScreenNavigationProps";

export const Username = ({ navigation, route }: UsernameNavigationProps) => {
  const [username, setUsername] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>();
  const [isDisabled, setIsDisabled] = useState<boolean>();

  return (
    <NMScreen>
      <BackButton navigation={navigation} />
      <View
        style={{
          flex: 1,
          alignItems: "flex-start",
          justifyContent: "center",
        }}
      >
        <AskUsername />
        <View style={styles.inputContainer}>
          <Input
            isValid={true}
            style={{ width: "90%" }}
            icon={
              <MaterialIcons
                name="alternate-email"
                size={Dimensions.get("window").height >= 800 ? 24 : 20}
                color={colors.iconColor}
              />
            }
            placeholder="username"
            placeholderTextColor={colors.iconColor}
            onChangeText={(text) => {
              sameUsernames(text_modifier(text), setErrorMsg)
                .then((res) => {
                  setIsDisabled(!res);
                })
                .catch((err) => {
                  setIsDisabled(!err);
                });
              setUsername(text_modifier(text));
            }}
            value={username}
            autoCorrect={false}
            autoCapitalize={"none"}
            autoFocus
          />
        </View>
        <NextButton
          navigation={navigation}
          disabled={isDisabled}
          errorMsg={errorMsg}
          name={route.params?.name}
          surname={route.params?.surname}
          username={username}
        />
      </View>
    </NMScreen>
  );
};
const styles = StyleSheet.create({
  title: {
    fontFamily: FontFamily.bold,
    fontSize: 35,
    color: colors.buttonTextColor,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  textInput: {
    borderBottomColor: colors.iconColor,
    fontFamily: FontFamily.bold,
    paddingVertical: "5%",
    paddingHorizontal: 10,
    width: "100%",
    color: colors.text,
  },
  nextButtonContainer: {
    width: "40%",
    position: "absolute",
    bottom: 10,
    right: 0,
    alignSelf: "flex-end",
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",
    backgroundColor: colors.accentColor,
    padding: 10,
    borderRadius: 40,
  },
  nextButtonText: {
    fontWeight: "bold",
    color: colors.buttonTextColor,
  },
  container: {
    flex: 1,
  },
});
