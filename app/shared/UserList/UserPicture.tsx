import React, { Dispatch, SetStateAction } from "react";

import { Image, StyleSheet, View } from "react-native";
import { image } from "../../../assets/images";
import { Skeleton } from "moti/skeleton";

interface UserPictureProps {
  userImage?: string;
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}
const skeletonStyle = {
  height: 60,
  width: 60,
};
const UserPicture = ({ userImage, show, setShow }: UserPictureProps) => {
  return (
    <Skeleton
      show={show}
      radius={"round"}
      height={skeletonStyle.height}
      boxHeight={skeletonStyle.height}
      width={skeletonStyle.width}
    >
      <View style={styles.container}>
        <Image
          source={userImage ? { uri: userImage } : image.noImage}
          style={styles.imageStyle}
          onLoadEnd={() => setShow(false)}
        />
      </View>
    </Skeleton>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    aspectRatio: 1 / 1,
  },
  imageStyle: { height: "100%", width: "100%", borderRadius: 9999 },
});
export default UserPicture;
