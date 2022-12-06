import React, { useState, useEffect } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ModalPhoto } from "../../../Register_LogIn/Sign_up/Sign_up_screens/Modal";
import useUserImage from "../../../../hooks/useUserImage";
import {
  _hideModal,
  _imagePropHandler,
} from "../../../Register_LogIn/Sign_up/Sign_up_screens/AvatarFunctions/ACFunctions";
import { IOSModal } from "../../../Register_LogIn/Sign_up/Sign_up_screens/IOSModal";
import { isAndroid } from "../../../../src/platform";
import Button from "../../Button";
import { colors } from "../../../../src/colors";
export default function EditImage({ uri }) {
  const { fetchableImage } = useUserImage(uri);
  const route = useRoute();
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState();
  const _showModalHandle = () => {
    !isAndroid && IOSModal(_imagePropHandler, setImage);
    setShowModal(isAndroid);
  };
  useEffect(() => {
    setImage(route.params?.imageURI);
  }, [route.params?.imageURI]);
  const navigation = useNavigation();
  const source = fetchableImage
    ? { uri: uri }
    : require("../../../../../assets/images/noImage-01.png");

  const onPress = () => {
    navigation.navigate("Profile", { user });
  };

  return (
    <View
      style={{
        width: "100%",
        justifyContent: "space-between",
        marginBottom: "5%",
        flexDirection: "row",
        alignItems: "flex-end",
      }}
    >
      <TouchableOpacity style={{}} onPress={() => {}}>
        <Image source={source} style={styles.imageStyle} />
      </TouchableOpacity>
      <View>
        <Button
          onPress={onPress}
          text="Done"
          style={{
            backgroundColor: colors.doneButtonBG,
          }}
          textStyled={{ color: colors.doneButtonText }}
        />
      </View>
      <ModalPhoto
        routeName={route.name}
        hideModal={_hideModal.bind(null, setShowModal)}
        showModal={showModal}
        imageHandler={_imagePropHandler}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  imageStyle: {
    borderRadius: "45%",
    height: 100,
    aspectRatio: 1,
  },
});
