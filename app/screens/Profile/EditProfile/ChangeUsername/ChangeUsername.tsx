import { StyleSheet, Text, TextInput } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { ScreenCreateParty } from "../../../../shared/Screen/ScreenCreateParty";
import Input from "../../../../shared/Input/Input";
import { text_modifier } from "../../../Authorization/Sign_up/Sign_up_screens/Sign_up_Functions/text_modifier";
import { sameUsernames } from "../../../Authorization/Sign_up/Sign_up_screens/Sign_up_Functions/sameUsername";
import ChangeScreen from "../../Layout/ChangeScreen";
import { ProfileStackScreenNavigationProps } from "../../../../Types/ProfileStack/ScreenNavigationProps";
import { changeUser } from "../ChangeBio/changeUser";
import { colors } from "../../../../src/colors";
import { FontFamily } from "../../../../../assets/fonts/Fonts";
import Animated from "react-native-reanimated";
import AnimatedError from "../../../../shared/Error/AnimatedError";

const ChangeUsername = ({
  navigation,
  route,
}: ProfileStackScreenNavigationProps<"ChangeUsername">) => {
  const [isUsernameValid, setIsUsernameValid] = useState<boolean>(true);
  const [username, setUsername] = useState<string>(route.params.username!);
  const [errorMsg, setErrorMsg] = useState<string>();
  const [showAlertModal, setShowAlertModal] = useState<boolean>(false);
  const inputRef = useRef<TextInput>(null);
  const animatedRef = useRef<Animated.View>(null);
  function hideModal() {
    setShowAlertModal(false);
  }
  //dududjx
  //idjxmcm
  function onBackPress() {
    if (username != route.params.username) {
      setShowAlertModal(true);
    } else {
      navigation.goBack();
    }
  }
  function onPressSave() {
    if (username != route.params.username) {
      changeUser({ username }).then(() =>
        navigation.navigate("EditProfile", { username: username })
      );
    } else {
      navigation.goBack();
    }
  }

  useEffect(() => {
    if (!isUsernameValid) {
    }
  }, [isUsernameValid]);

  return (
    <ChangeScreen
      navBarTitle="Edit username"
      hideModal={hideModal}
      navigation={navigation}
      onBackPress={onBackPress}
      onPressSave={onPressSave}
      showAlertModal={showAlertModal}
      inputRef={inputRef}
    >
      <TextInput
        onChangeText={(text) => {
          setUsername(text_modifier(text));
        }}
        placeholder="Username"
        defaultValue={`@${username}`}
        onEndEditing={() => {
          sameUsernames(username, setErrorMsg)
            .then(() => {
              setIsUsernameValid(true);
            })
            .catch((err) => {
              if (username !== `${route.params.username}`) {
                setIsUsernameValid(false);
              }
            });
        }}
        style={styles.textInputStyle}
        ref={inputRef}
      />
      {!isUsernameValid && errorMsg && (
        <AnimatedError errorMessage={errorMsg} />
      )}
    </ChangeScreen>
  );
};

export default ChangeUsername;

const styles = StyleSheet.create({
  textInputStyle: {
    borderBottomWidth: 1,
    borderColor: colors.text,
    color: colors.text,
    fontFamily: FontFamily.bold,
    padding: 10,
  },
});
