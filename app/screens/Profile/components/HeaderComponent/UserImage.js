import React from "react";
import { Alert, Image, StyleSheet, View } from "react-native";
import useUserImage from "../../../../hooks/useUserImage";
import Button from "../Button";
import { useNavigation } from "@react-navigation/native";
import { Skeleton } from "moti/skeleton";
import { isAndroid } from "../../../../src/platform";
import { auth } from "../../../../../firebase";

export default function UserImage({ Loader, user, style }) {
  const { isLoading, setIsLoading } = Loader;
  const { returnImage } = useUserImage(user.image);

  const navigation = useNavigation();
  const onPress = () => {
    navigation.navigate("EditProfile", {
      user,
      image: { returnImage },
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
          source={returnImage}
          style={[styles.imageStyle, style]}
          onLoadEnd={() => {
            setIsLoading(false);
          }}
        />
      </Skeleton>
      <Button
        onPress={async () => {
          Alert.alert("Are you sure?", "", [
            {
              text: "Log out",
              onPress: async () => await auth.signOut(),
              style: "destructive",
            },
            { text: "Cancel", onPress: () => {}, style: "default" },
          ]);
        }}
        text={"Log out"}
      />
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
