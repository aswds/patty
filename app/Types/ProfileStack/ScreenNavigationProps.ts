import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import {
  ProfileNavigatorParamList,
  ProfileNavNavigatorParamList,
} from "./NavigationTypes";

export type ProfileNavigationProps =
  NativeStackNavigationProp<ProfileNavNavigatorParamList>;

export type ProfileScreenNavigationProps = NativeStackScreenProps<
  ProfileNavigatorParamList,
  "Profile"
>;
export type EditProfileScreenNavigationProps = NativeStackScreenProps<
  ProfileNavigatorParamList,
  "EditProfile"
>;
