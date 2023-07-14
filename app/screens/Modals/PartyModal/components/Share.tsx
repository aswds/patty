import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { FontFamily } from "../../../../../assets/fonts/Fonts";
import { MapNavigationProps } from "../../../../Types/MapStack/ScreenNavigationProps";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import { IconButton } from "../../../../shared/Icons/IconButton";
import { colors } from "../../../../src/colors";

const InviteButton = ({ creatorUID }: { creatorUID: string }) => {
  const { followers, following } = useTypedSelector(
    (state) => state.user_state.current_user
  );
  const navigation = useNavigation<MapNavigationProps>();
  const usersToInvite = followers?.filter((userUID) =>
    following?.includes(userUID)
  );
  const isCreatorInList = usersToInvite?.findIndex(
    (userUID) => userUID === creatorUID
  );

  return (
    <IconButton
      text={"Invite"}
      Icon={FontAwesome5}
      name={"users"}
      textStyle={styles.iconTextStyle}
      onPress={() => {
        navigation.navigate("InvitationScreen", { users: usersToInvite });
      }}
    />
  );
};

export default InviteButton;

const styles = StyleSheet.create({
  iconTextStyle: {
    color: colors.text,
    fontFamily: FontFamily.bold,
  },
});
