import React, {
  MutableRefObject,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { colors } from "../../../../src/colors";
import Input from "../../../../shared/Input/Input";
import { BackButton } from "../../../../shared/Buttons/BackButton";
import {
  isProfane,
  text_modifier_name,
} from "../../../../services/text_modifier";
import { FontFamily } from "../../../../../assets/fonts/Fonts";
import { SignUpStackScreenProps } from "../../../../Types/Authorization/SignUp/ScreenNavigationProps";
import Button from "../../components/BigButton";
import { Screen } from "../../../../shared/Screen/Screen";
import CustomAlert from "../../../../shared/Alert/CustomAlert";
import Title from "../../components/Title";
import NextButton from "../../../../shared/Buttons/NextButton";

export const NameModal = ({
  navigation,
}: SignUpStackScreenProps<"NameInfo">) => {
  const [name, setName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<AlertState>({
    title: "",
    message: "",
  });
  const [showAlertModal, setShowAlertModal] = useState<boolean>(false);

  const surname_input_ref = useRef<TextInput | null>(null);
  const refHandle = useCallback(
    (ref_input: MutableRefObject<TextInput | null>) => {
      ref_input?.current?.focus();
    },
    []
  );

  const handleErrorMessage = useMemo(
    () => (title: string, message: string) => {
      setErrorMsg({ title: title, message: message });
      setShowAlertModal(true);
    },
    []
  );

  return (
    <Screen style={{ justifyContent: undefined }}>
      <BackButton navigation={navigation} />
      <View style={styles.container}>
        <View
          style={{
            flex: 1,
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          <Title
            title={`Let's Get Acquainted!👋`}
            message="What's your full name?"
          />
          <View style={styles.inputContainer}>
            <Input
              isValid={true}
              style={{ flex: 1, marginRight: 5 }}
              inputStyle={styles.textInput}
              placeholder="name"
              placeholderTextColor={colors.iconColor}
              onChangeText={(text) => {
                setName(text);
              }}
              autoCapitalize={"words"}
              value={name}
              onSubmitEditing={() => {
                refHandle(surname_input_ref);
              }}
              autoCorrect={false}
              maxLength={30}
            />
            <Input
              isValid={true}
              style={{ flex: 1 }}
              inputStyle={styles.textInput}
              placeholder="surname"
              placeholderTextColor={colors.iconColor}
              onChangeText={(text) => {
                setSurname(text);
              }}
              autoCapitalize={"words"}
              value={surname}
              ref={surname_input_ref}
              autoCorrect={false}
              maxLength={30}
            />
          </View>
        </View>

        <NextButton
          onPress={() =>
            navigation.navigate("Username", {
              name,
              surname,
            })
          }
          handleErrorMessage={handleErrorMessage}
          isValueEntered={Boolean(name && surname)}
          containsProfane={isProfane(name) || isProfane(surname)}
          error={{
            title: `Please provide your full name.`,
            message: `To make a good first impression when meeting new people, it's important to use your full name. So, be sure to enter both your name and surname.`,
          }}
        />
      </View>
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
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  title: {
    fontFamily: FontFamily.bold,
    fontSize: 35,
    color: colors.text,
  },
  textInput: {
    borderBottomColor: colors.iconColor,
    fontFamily: FontFamily.bold,
    paddingVertical: "5%",
    width: "100%",
    color: colors.text,
  },

  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
});
