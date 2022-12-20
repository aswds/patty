import React, { useState } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import useUserImage from "../../../../hooks/useUserImage";
import Container from "./Container";
import Button from "../../Button";
import { useNavigation } from "@react-navigation/native";
import { Skeleton } from "moti/skeleton";
export default function UserImage({ uri, Loader, user }) {
  const { isLoading, setIsLoading } = Loader;

  const { fetchableImage } = useUserImage(uri);

  const navigation = useNavigation();

  const source = fetchableImage
    ? { uri: uri }
    : require("../../../../../assets/images/noImage-01.png");

  const onPress = () => {
    navigation.navigate("EditProfile", {
      user,
      image: { source: source, isDefault: !fetchableImage },
    });
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
      {/* Loader */}
      <Skeleton show={isLoading} radius={"43%"} height={100} width={100}>
        <View>
          <Image
            source={source}
            style={styles.imageStyle}
            onLayout={() => {
              setTimeout(() => {
                setIsLoading(false);
              }, 500);
            }}
          />
        </View>
      </Skeleton>

      <View>
        <Button onPress={onPress} text="Edit" />
      </View>
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
