import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Skeleton } from "moti/skeleton";
import { isAndroid } from "../../../../src/platform";
import CurrentUserButtons from "../CurrentUserButtons";

export default function UserImage({ Loader, user, style }) {
  const { isLoading, setIsLoading } = Loader;

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
          source={{ uri: user.image }}
          style={[styles.imageStyle, style]}
          onLoadEnd={() => {
            setIsLoading(false);
          }}
        />
      </Skeleton>
      <CurrentUserButtons user={user} />
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
