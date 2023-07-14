import { useNavigation } from "@react-navigation/native";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { image } from "../../../../assets/images";
import { ProfileNavigationProps } from "../../../Types/ProfileStack/ScreenNavigationProps";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import BoldText from "../../../shared/Text/BoldText";
import { colors } from "../../../src/colors";
import { isAndroid } from "../../../src/platform";

// Button to navigate to profile screen

interface ProfileButtonProps {
  onLongPress?: () => void;
  userUID: string;
  userImage?: string;
  containerStyle?: ViewStyle;
  city?: string;
}
const MapHeader = ({
  onLongPress,
  userUID,
  userImage,
  containerStyle,
  city,
}: ProfileButtonProps) => {
  const navigation = useNavigation<ProfileNavigationProps>();
  const { current_user } = useTypedSelector((state) => state.user_state);
  function onPress() {
    navigation.navigate("ProfileNav", {
      screen: "Profile",
      params: {
        current_user: current_user,
      },
    });
  }
  return (
    <View style={{ ...containerStyle, ...styles.container }}>
      {!city ? (
        <ActivityIndicator size={"small"} color={"white"} />
      ) : (
        <BoldText textStyles={styles.cityText} onPress={onLongPress}>
          {city}
        </BoldText>
      )}

      <TouchableOpacity
        style={[styles.userImageContainer]}
        onPress={onPress}
        onLongPress={onLongPress}
      >
        <Image
          source={userImage ? { uri: userImage } : image.noImage}
          style={{
            height: "100%",
            width: "100%",
            backgroundColor: colors.background,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    position: "absolute",
    justifyContent: "space-between",

    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: "5%",
  },
  userImageContainer: {
    marginTop: isAndroid ? "5%" : 0,
    height: 55,
    aspectRatio: 1,
    borderWidth: 2,
    borderRadius: 20,
    overflow: "hidden",
    borderColor: colors.accentColor,
    backgroundColor: colors.background,
  },
  cityText: {
    fontSize: 30,
    textDecorationLine: "underline",
    maxWidth: "80%",
    color: colors.background,
    fontWeight: "bold",
    textAlign: "left",
    paddingRight: 10,
  },
});

export default MapHeader;
