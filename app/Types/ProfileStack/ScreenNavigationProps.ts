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

export type ProfileStackScreenNavigationProps<
  T extends keyof ProfileNavigatorParamList
> = NativeStackScreenProps<ProfileNavigatorParamList, T>;
