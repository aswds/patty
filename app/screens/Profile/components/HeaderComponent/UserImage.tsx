import React, { Dispatch, SetStateAction } from "react";
import { Image, ImageStyle, StyleProp, StyleSheet, View } from "react-native";
import { Skeleton } from "moti/skeleton";
import CurrentUserButtons from "../CurrentUserButtons";
import { IUser } from "../../../../Types/User";

interface UserImageProps {
  Loader: {
    setIsLoading: Dispatch<SetStateAction<boolean>>;
    isLoading: boolean;
  };
  user: IUser;
  style?: StyleProp<ImageStyle>;
}

export default function UserImage({ Loader, user, style }: UserImageProps) {
  const { isLoading, setIsLoading } = Loader;
  return (
    <View style={styles.container}>
      {/* Loader */}
      <Skeleton show={isLoading} radius={45} height={100} width={100}>
        <Image
          source={{ uri: user.image }}
          style={[styles.imageStyle, style]}
          onLoadEnd={() => {
            setIsLoading(false);
          }}
        />
      </Skeleton>
      {/*follow/unfollow buttons*/}
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
    borderRadius: 45,
    height: 100,
    aspectRatio: 1,
  },
});
