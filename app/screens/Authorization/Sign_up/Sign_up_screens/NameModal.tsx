import React, { MutableRefObject, useRef, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { colors } from "../../../../src/colors";
import Input from "../../../../shared/Input/Input";
import { BackButton } from "../../../../shared/Buttons/BackButton";
import NMAskName from "./components/NameModalComp/NMAskName";
import NMNextButton from "./components/NameModalComp/NMNextButton";
import { NMScreen } from "./components/NameModalComp/NMScreen";
import { text_modifier_name } from "./Sign_up_Functions/text_modifier";
import { FontFamily } from "../../../../../assets/fonts/Fonts";
import { NameInfoNavigationProps } from "../../../../Types/Authorization/SignUp/ScreenNavigationProps";

export const NameModal = ({ navigation }: NameInfoNavigationProps) => {
  const [fullName, setFullName] = useState({ name: "", surname: "" });
  const surname_input_ref = useRef<TextInput | null>(null);
  function refHandle(ref_input: MutableRefObject<TextInput | null>) {
    ref_input?.current?.focus();
  }
  return (
    <NMScreen>
      <BackButton navigation={navigation} />
      <View style={styles.container}>
        <View style={{}}>
          <NMAskName styles={styles} />
          <View style={styles.inputContainer}>
            <Input
              isValid={true}
              style={{ width: "45%" }}
              inputStyle={styles.textInput}
              placeholder="name"
              placeholderTextColor={colors.iconColor}
              onChangeText={(text) => {
                setFullName({ ...fullName, name: text });
              }}
              autoCapitalize={"words"}
              value={fullName.name!}
              onSubmitEditing={() => {
                refHandle(surname_input_ref);
              }}
              autoCorrect={false}
            />

            <Input
              isValid={true}
              style={{ width: "45%" }}
              inputStyle={styles.textInput}
              placeholder="surname"
              placeholderTextColor={colors.iconColor}
              onChangeText={(text) => {
                setFullName({
                  ...fullName,
                  surname: text,
                });
              }}
              autoCapitalize={"words"}
              value={fullName.surname!}
              ref={surname_input_ref}
              autoCorrect={false}
            />
          </View>
        </View>
        <NMNextButton
          navigation={navigation}
          styles={styles}
          name={fullName.name}
          surname={fullName.surname}
        />
      </View>
    </NMScreen>
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
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
  },
  nextButtonText: {
    fontWeight: "bold",
    color: colors.buttonTextColor,
  },
});
