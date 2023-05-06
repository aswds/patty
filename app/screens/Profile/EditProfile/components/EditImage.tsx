import React, { useEffect, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import { ModalPhoto } from "../../../Authorization/Sign_up/Sign_up_screens/Modal";
import {
  _hideModal,
  _imagePropHandler,
} from "../../../Authorization/Sign_up/Sign_up_screens/AvatarFunctions/ACFunctions";
import { _showModalHandle } from "../../../Authorization/Sign_up/Sign_up_screens/Sign_up_Functions/_showModalHandel";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../../../../src/colors";
import { Skeleton } from "moti/skeleton";
import { image } from "../../../../../assets/images";

interface EditImageProps {
  source: any;
  handleUserImageEdit: (image: string) => void;
}

export default function EditImage({
  source,
  handleUserImageEdit,
}: EditImageProps) {
  const route = useRoute();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [displayedImage, setImage] = useState<string>(source);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  function editImageHandle(image: string) {
    handleUserImageEdit(image);
    setImage(image);
  }
  useEffect(() => {});
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          _showModalHandle(editImageHandle, setShowModal);
        }}
      >
        <Skeleton show={isLoading} radius={"round"}>
          <Image
            source={displayedImage ? { uri: displayedImage } : image.noImage}
            style={styles.imageStyle}
            onLoadEnd={() => setIsLoading(false)}
          />
        </Skeleton>

        <View style={styles.iconContainer}>
          <MaterialIcons name="edit" size={15} color={colors.background} />
        </View>
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
  container: {
    justifyContent: "flex-start",
    flexDirection: "row",
    alignItems: "flex-end",
  },
  imageStyle: {
    borderRadius: 50,
    height: 100,
    aspectRatio: 1,
  },
  iconContainer: {
    position: "absolute",
    bottom: "5%",
    right: "5%",
    backgroundColor: colors.accentColor,
    borderRadius: 9999,
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
    borderColor: colors.background,
    shadowColor: colors.background,
    shadowOpacity: 1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
  },
});
