import React, { useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import { ModalPhoto } from "../../../Register_LogIn/Sign_up/Sign_up_screens/Modal";
import {
  _hideModal,
  _imagePropHandler,
} from "../../../Register_LogIn/Sign_up/Sign_up_screens/AvatarFunctions/ACFunctions";
import { _showModalHandle } from "../../../Register_LogIn/Sign_up/Sign_up_screens/Sign_up_Functions/_showModalHandel";

export default function EditImage({ source }) {
  const route = useRoute();
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState(source);

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
        <Image source={image} style={styles.imageStyle} />
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
    borderRadius: 50,
    height: 100,
    aspectRatio: 1,
  },
});
