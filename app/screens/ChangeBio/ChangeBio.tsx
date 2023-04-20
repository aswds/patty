import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Screen } from "../../shared/Screen/Screen";
import NavigationBar from "../Map/PartyCreationScreens/NavigationBar";
import { ProfileStackScreenNavigationProps } from "../../Types/ProfileStack/ScreenNavigationProps";
import { ScreenCreateParty } from "../../shared/Screen/ScreenCreateParty";
import Input from "../../shared/Input/Input";
import { colors } from "../../src/colors";
import { FontFamily } from "../../../assets/fonts/Fonts";
import Button from "../../shared/Buttons/Button";
import { preventLeaving } from "../Map/PartyCreationScreens/preventLeaving";
import CustomAlert from "../../shared/Alert/CustomAlert";
import BigButton from "../Authorization/components/BigButton";
import { WebViewNavigationEvent } from "react-native-webview/lib/WebViewTypes";
import { NativeStackNavigationEventMap } from "@react-navigation/native-stack";
import { changeUserBio } from "./changeUserBio";
const ChangeBio = ({
  navigation,
  route,
}: ProfileStackScreenNavigationProps<"ChangeBio">) => {
  const [bio, setBio] = useState<string | undefined>(route.params?.bio);
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
      changeUserBio(bio!).then(() =>
        navigation.navigate("EditProfile", { bio: bio })
      );
    } else {
      navigation.goBack();
    }
  }
  // const handleBackButton = (unsavedChanges: boolean, event: any) => {
  //   if (unsavedChanges) {
  //     // Prompt the user to confirm leaving without saving
  //     // e.g. using `Alert.alert()`
  //     event.preventDefault();
  //     setShowAlertModal(true);
  //     // Prevent the user from leaving
  //   }
  //   return; // Allow the user to leave
  // };

  return (
    <ScreenCreateParty containerStyle={{ paddingTop: 10 }} keyboardOffset={65}>
      <NavigationBar
        navigation={navigation}
        text="Change bio"
        onPress={onBackPress}
      />
      <TextInput
        style={styles.textInputStyle}
        onChangeText={(text) => setBio(text)}
        multiline
        maxLength={150}
        keyboardType="twitter"
        defaultValue={bio}
      />
      {
        <Text style={styles.availableCharNumberStyle}>
          {bio ? 150 - bio?.length : 150}
        </Text>
      }
      <CustomAlert
        showModal={showAlertModal}
        hideModal={hideModal}
        title="Discard changes?"
        errorMsg="Your unsaved changes will be lost."
        okButtonText="discard changes"
        okButtonTextStyle={{
          fontFamily: FontFamily.extra_bold,
          color: colors.accentColor,
        }}
        onPressOk={() => navigation.goBack()}
        cancelButtonTextStyle={{
          fontFamily: FontFamily.bold,
          color: colors.text,
        }}
        cancelButtonText="keep editing"
        onPressCancel={hideModal}
      />
      <BigButton
        style={{ bottom: 0, alignSelf: "center" }}
        title="Save"
        onPress={onPressSave}
      />
    </ScreenCreateParty>
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
