import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Screen } from "../../../../shared/Screen/Screen";
import NavigationBar from "../../../Map/PartyCreationScreens/NavigationBar";
import { ProfileStackScreenNavigationProps } from "../../../../Types/ProfileStack/ScreenNavigationProps";
import { ScreenCreateParty } from "../../../../shared/Screen/ScreenCreateParty";
import Input from "../../../../shared/Input/Input";
import { colors } from "../../../../src/colors";
import { FontFamily } from "../../../../../assets/fonts/Fonts";
import Button from "../../../../shared/Buttons/Button";
import CustomAlert from "../../../../shared/Alert/CustomAlert";
import BigButton from "../../../Authorization/components/BigButton";
import { WebViewNavigationEvent } from "react-native-webview/lib/WebViewTypes";
import { NativeStackNavigationEventMap } from "@react-navigation/native-stack";
import { changeUser } from "./changeUser";
import ChangeScreen from "../../Layout/ChangeScreen";
import { IUser } from "../../../../Types/User";
const ChangeBio = ({
  navigation,
  route,
}: ProfileStackScreenNavigationProps<"ChangeBio">) => {
  const [bio, setBio] = useState<string | undefined>(route.params?.bio);

  // References for email input to use for focus
  const inputRef = useRef<TextInput>(null);
  // State to track whether the email input should be focused

  const [showAlertModal, setShowAlertModal] = useState<boolean>(false);
  function hideModal() {
    setShowAlertModal(false);
  }

  function onBackPress() {
    if (bio != route.params.bio) {
      setShowAlertModal(true);
    } else {
      navigation.goBack();
    }
  }
  function onPressSave() {
    if (bio != route.params.bio) {
      changeUser({ bio }).then(() =>
        navigation.navigate("EditProfile", { bio: bio })
      );
    } else {
      navigation.goBack();
    }
  }

  return (
    <ChangeScreen
      hideModal={hideModal}
      navigation={navigation}
      onBackPress={onBackPress}
      onPressSave={onPressSave}
      showAlertModal={showAlertModal}
      navBarTitle="Edit bio"
      inputRef={inputRef}
    >
      <TextInput
        style={styles.textInputStyle}
        onChangeText={(text) => setBio(text)}
        multiline
        maxLength={150}
        keyboardType="twitter"
        defaultValue={bio}
        ref={inputRef}
      />
      {
        <Text style={styles.availableCharNumberStyle}>
          {bio ? 150 - bio?.length : 150}
        </Text>
      }
    </ChangeScreen>
  );
};

export default ChangeBio;

const styles = StyleSheet.create({
  textInputStyle: {
    borderBottomWidth: 1,
    borderColor: colors.text,
    color: colors.text,
    fontFamily: FontFamily.bold,
    padding: 10,
  },
  availableCharNumberStyle: {
    fontFamily: FontFamily.regular,
    color: colors.text,
    alignSelf: "flex-end",
  },
});
