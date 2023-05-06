import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { colors } from "../../../../src/colors";
import ACAskImage from "./components/AvatarChooseComp/ACAskImage";
import ACImage from "./components/AvatarChooseComp/ACImage";
import ACNextButton from "./components/AvatarChooseComp/ACNextButton";
import { BackButton } from "../../../../shared/Buttons/BackButton";
import { ModalPhoto } from "./Modal";
import { _hideModal, _imagePropHandler } from "./AvatarFunctions/ACFunctions";
import useGallery from "../../../../hooks/useGallery";
import { isAndroid } from "../../../../src/platform";
import { _showModalHandle } from "./Sign_up_Functions/_showModalHandel";
import { FontFamily } from "../../../../../assets/fonts/Fonts";
import { SignUpStackScreenProps } from "../../../../Types/Authorization/SignUp/ScreenNavigationProps";
import { Screen } from "../../../../shared/Screen/Screen";
import Title from "../../components/Title";
import NextButton from "../../../../shared/Buttons/NextButton";

export const AvatarChoose = ({
  navigation,
  route,
}: SignUpStackScreenProps<"Avatar">) => {
  useEffect(() => {
    setImage(route.params?.imageURI);
  }, [route.params?.imageURI]);
  const imageParam = route.params?.imageURI;
  const [showModal, setShowModal] = useState<boolean>(isAndroid);
  const [image, setImage] = useState<string>(imageParam);
  const name = route.params?.name;
  const surname = route.params?.surname;
  const username = route.params?.username;
  useGallery();

  // not safe to pass params in  3 screens (change to (registration->firebase.createNewUser->enter name -> choose avatar -> updateProfile -> Home screen))
  return (
    <Screen style={{ flex: 1, justifyContent: "space-evenly" }}>
      <BackButton navigation={navigation} />

      <View
        style={{
          flex: 1,
          justifyContent: "space-evenly",
        }}
      >
        <ACImage
          _showModalHandle={_showModalHandle.bind(null, setImage, setShowModal)}
          image={image}
        />

        <Title
          title={`Let's Choose Your Profile Picture!`}
          message="Show the World Your Best Smile :)"
        />

        <ModalPhoto
          routeName={route.name}
          hideModal={_hideModal.bind(null, setShowModal)}
          showModal={showModal}
          imageHandler={_imagePropHandler.bind(null, setImage)}
        />
      </View>
      <NextButton
        style={{ marginTop: "auto" }}
        handleErrorMessage={() => {}}
        onPress={() => {
          if (name && surname && username) {
            navigation.navigate("SignUpScreen", {
              name: name,
              surname: surname,
              username: username,
              imageURI: image || "",
            });
          }
        }}
        error={{
          title: "",
          message: "",
        }}
      />
    </Screen>
  );
};
const styles = StyleSheet.create({
  title: {
    fontFamily: FontFamily.extra_bold,
    fontSize: 20,
    color: colors.text,
  },
  textStyle: {
    fontFamily: FontFamily.regular,
    fontSize: 20,
    color: colors.iconColor,
  },
  container: {
    flex: 1,
  },
  nextButtonContainer: {
    width: "35%",
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
});
