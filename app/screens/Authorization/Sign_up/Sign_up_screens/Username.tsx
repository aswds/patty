import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { colors } from "../../../../src/colors";
import { BackButton } from "../../../../shared/Buttons/BackButton";
import Input from "../../../../shared/Input/Input";
import NextButton from "../../../../shared/Buttons/NextButton";
import { sameUsernames } from "../../../../services/sameUsername";
import { isProfane, text_modifier } from "../../../../services/text_modifier";
import { FontFamily } from "../../../../../assets/fonts/Fonts";
import { SignUpStackScreenProps } from "../../../../Types/Authorization/SignUp/ScreenNavigationProps";
import { Screen } from "../../../../shared/Screen/Screen";
import Title from "../../components/Title";
import CustomAlert from "../../../../shared/Alert/CustomAlert";

export const Username = ({
  navigation,
  route,
}: SignUpStackScreenProps<"Username">) => {
  const [username, setUsername] = useState<string>("");
  const [isDisabled, setIsDisabled] = useState<boolean>();
  const [errorMsg, setErrorMsg] = useState<AlertState>({
    title: "",
    message: "",
  });
  const { name, surname } = route.params;
  const [showAlertModal, setShowAlertModal] = useState<boolean>(false);

  function handleErrorMessage(title: string, message: string) {
    setErrorMsg({ title: title, message: message });
    setShowAlertModal(true);
  }
  function handleSetErrorMessage(title: string, message: string) {
    setErrorMsg({ title: title, message: message });
  }
  return (
    <Screen>
      <BackButton navigation={navigation} />
      <View
        style={{
          flex: 1,
          alignItems: "flex-start",
          justifyContent: "center",
        }}
      >
        <Title
          title="What's Your Handle? 👀"
          message="It's time to pick username"
        />
        <View style={styles.inputContainer}>
          <Input
            isValid={true}
            style={{ width: "100%" }}
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
              sameUsernames(username, handleSetErrorMessage)
                .then((res) => {
                  setIsDisabled(false);
                })
                .catch(() => {
                  setIsDisabled(true);
                });
              console.log(errorMsg);
              setUsername(text_modifier(text));
            }}
            value={username}
            autoCorrect={false}
            autoCapitalize={"none"}
            autoFocus
          />
        </View>
      </View>
      <NextButton
        error={errorMsg}
        handleErrorMessage={handleErrorMessage}
        onPress={() => {
          navigation.navigate("Avatar", {
            name,
            surname,
            username,
            imageURI: "",
          });
        }}
        containsProfane={isProfane(username)}
        isValueEntered={
          !isDisabled &&
          Boolean(name.length > 0 && surname.length > 0 && username.length > 3)
        }
      />
      <CustomAlert
        errorMsg={errorMsg.message}
        title={errorMsg.title}
        hideModal={() => setShowAlertModal(false)}
        showModal={showAlertModal}
      />
    </Screen>
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
    width: "100%",
    color: colors.text,
  },
  nextButtonContainer: {
    width: "100%",
    flexDirection: "row",
    marginTop: "auto",
    backgroundColor: colors.accentColor,
    borderRadius: 40,
  },

  container: {
    flex: 1,
  },
});
