import React from "react";
import { Image, StyleSheet, View } from "react-native";
import useUserImage from "../../../../hooks/useUserImage";
import Button from "../Button";
import { useNavigation } from "@react-navigation/native";
import { Skeleton } from "moti/skeleton";
import { isAndroid } from "../../../../src/platform";

export default function UserImage({ uri, Loader, user, style }) {
  const { isLoading, setIsLoading } = Loader;
  const { image } = useUserImage(uri);

  const navigation = useNavigation();
  console.log(image);
  const onPress = () => {
    navigation.navigate("EditProfile", {
      user,
      image: { image },
    });
  };

  return (
    <View style={styles.container}>
      {/* Loader */}
      <Skeleton
        show={isLoading}
        radius={isAndroid ? 45 : "43%"}
        height={100}
        width={100}
      >
        <Image
          source={image}
          style={[styles.imageStyle, style]}
          onLoadEnd={() => {
            setIsLoading(false);
          }}
        />
      </Skeleton>

      <View>
        <Button onPress={onPress} text="Edit" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "space-between",
    marginBottom: "5%",
    flexDirection: "row",
    alignItems: "flex-end",
  },
  imageStyle: {
    borderRadius: isAndroid ? 45 : "45%",
    height: 100,
    aspectRatio: 1,
  },
});
