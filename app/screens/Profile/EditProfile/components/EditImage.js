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
import { _showModalHandle } from "../../../Register_LogIn/Sign_up/Sign_up_screens/Sign_up_Functions/_showModalHandel";
export default function EditImage({ source, isDefault }) {
  const route = useRoute();
  const [showModal, setShowModal] = useState(false);
  const [isDefaultImage, setIsDefault] = useState(isDefault);
  const [image, setImage] = useState(source);
  const navigation = useNavigation();

  return (
    <View
      style={{
        justifyContent: "flex-start",
        flexDirection: "row",
        alignItems: "flex-end",
      }}
    >
      <TouchableOpacity
        style={{}}
        onPress={() => {
          _showModalHandle(setImage, setShowModal);
        }}
      >
        <Image
          source={image == source ? source : { uri: image }}
          style={styles.imageStyle}
        />
      </TouchableOpacity>

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
