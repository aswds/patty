import { FontAwesome5 } from "@expo/vector-icons";
import {
  DarkTheme,
  useNavigation,
  useRoute,
  useTheme,
} from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import {
  Image,
  ImageBackground,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  ScrollView,
} from "react-native";
import { colors } from "../../../../src/colors";
import ACAskImage from "./components/AvatarChooseComp/ACAskImage";
import ACImage from "./components/AvatarChooseComp/ACImage";
import ACNextButton from "./components/AvatarChooseComp/ACNextButton";
import { ACScreen } from "./components/AvatarChooseComp/ACScreen";
import { BackButton } from "../../components/BackButton";
import NMNextButton from "./components/NameModalComp/NMNextButton";
import { ModalPhoto } from "./Modal";
import { IOSModal } from "./IOSModal";
export const AvatarChoose = (props) => {
  const route = useRoute();

  const _hideModal = () => {
    setShowModal(false);
  };
  const _imagePropHandler = (imageProp) => {
    setImage(imageProp);
  };
  const _showModalHandle = () => {
    !isAndroid && IOSModal(_imagePropHandler);

    setShowModal(isAndroid);
  };
  useEffect(() => {
    setImage(route.params?.imageURI);
  }, [route.params?.imageURI]);
  const imageParam = route.params?.imageURI;
  const isAndroid = Platform.OS == "android";
  const { colors } = useTheme();
  const [showModal, setShowModal] = useState(isAndroid);
  const [image, setImage] = useState(imageParam);
  const navigation = useNavigation();
  const name = route.params?.name;
  const surname = route.params?.surname;
  const username = route.params?.username;

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);
  // not safe to pass params in  3 screens (change to (registration->firebase.createNewUser->enter name -> choose avatar -> updateProfile -> Home screen))
  return (
    <ACScreen>
      <BackButton navigation={navigation} />
      <ACImage _showModalHandle={_showModalHandle} image={image} />

      <ACAskImage styles={styles} route={route} />

      <ModalPhoto
        routeName={route.name}
        hideModal={_hideModal}
        showModal={showModal}
        imageHandler={_imagePropHandler}
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
    fontFamily: "WorkSans-Bold",
    fontSize: 20,
    color: colors.buttonTextColor,
  },
  textStyle: {
    fontFamily: "WorkSans-Regular",
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
