import { Skeleton } from "moti/skeleton";
import { Dispatch, SetStateAction } from "react";
import { Image, ImageStyle, StyleProp, StyleSheet, View } from "react-native";
import { image } from "../../../../../assets/images";
import { IUser } from "../../../../Types/User";
import CurrentUserButtons from "../CurrentUserButtons";

interface UserImageProps {
  Loader: {
    setIsLoading: Dispatch<SetStateAction<boolean>>;
    isLoading: boolean;
  };
  user: IUser;
  style?: StyleProp<ImageStyle>;
  updateUser: (newUser: Pick<IUser, "following" | "followers">) => void;
}

export default function UserImage({
  Loader,
  user,
  style,
  updateUser,
}: UserImageProps) {
  const { isLoading, setIsLoading } = Loader;
  return (
    <View style={styles.container}>
      {/* Loader */}
      <Skeleton show={isLoading} radius={45} height={100} width={100}>
        <Image
          source={user.image ? { uri: user.image } : image.noImage}
          style={[styles.imageStyle, style]}
          onLoadEnd={() => {
            setIsLoading(false);
          }}
        />
      </Skeleton>
      {/*follow/unfollow buttons*/}
      <CurrentUserButtons user={user} updateUser={updateUser} />
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
