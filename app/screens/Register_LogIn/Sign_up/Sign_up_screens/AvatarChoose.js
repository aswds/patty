import { useNavigation, useRoute, useTheme } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { colors } from "../../../../src/colors";
import ACAskImage from "./components/AvatarChooseComp/ACAskImage";
import ACImage from "./components/AvatarChooseComp/ACImage";
import ACNextButton from "./components/AvatarChooseComp/ACNextButton";
import { ACScreen } from "./components/AvatarChooseComp/ACScreen";
import { BackButton } from "../../../../shared/Buttons/BackButton";
import { ModalPhoto } from "./Modal";
import { _hideModal, _imagePropHandler } from "./AvatarFunctions/ACFunctions";
import useGallery from "../../../../hooks/useGallery";
import { isAndroid } from "../../../../src/platform";
import { _showModalHandle } from "./Sign_up_Functions/_showModalHandel";
import { FontFamily } from "../../../../../assets/fonts/Fonts";

export const AvatarChoose = (props) => {
  const route = useRoute();
  const { colors } = useTheme();

  useEffect(() => {
    setImage(route.params?.imageURI);
  }, [route.params?.imageURI]);
  const imageParam = route.params?.imageURI;
  const [showModal, setShowModal] = useState(isAndroid);
  const [image, setImage] = useState(imageParam);
  const navigation = useNavigation();
  const name = route.params?.name;
  const surname = route.params?.surname;
  const username = route.params?.username;
  useGallery();

  // not safe to pass params in  3 screens (change to (registration->firebase.createNewUser->enter name -> choose avatar -> updateProfile -> Home screen))
  return (
    <ACScreen>
      <BackButton navigation={navigation} />
      <ACImage
        _showModalHandle={_showModalHandle.bind(null, setImage, setShowModal)}
        image={image}
      />

      <ACAskImage styles={styles} route={route} />

      <ModalPhoto
        routeName={route.name}
        hideModal={_hideModal.bind(null, setShowModal)}
        showModal={showModal}
        imageHandler={_imagePropHandler.bind(null, setImage)}
      />

      <ACNextButton
        styles={styles}
        image={image}
        name={name}
        surname={surname}
        username={username}
        navigation={navigation}
      />
    </ACScreen>
  );
};
const styles = StyleSheet.create({
  title: {
    fontFamily: FontFamily.bold,
    fontSize: 20,
    color: colors.buttonTextColor,
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
