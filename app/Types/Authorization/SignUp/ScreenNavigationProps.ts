import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { SignUpNavigatorParamList } from "./NavigationTypes";

export type SignUpNavNavigationProps =
  NativeStackNavigationProp<SignUpNavigatorParamList>;

export type SignUpNavigationProps = NativeStackScreenProps<
  SignUpNavigatorParamList,
  "SignUpScreen"
>;
export type NameInfoNavigationProps = NativeStackScreenProps<
  SignUpNavigatorParamList,
  "NameInfo"
>;
export type AvatarNavigationProps = NativeStackScreenProps<
  SignUpNavigatorParamList,
  "Avatar"
>;
export type UsernameNavigationProps = NativeStackScreenProps<
  SignUpNavigatorParamList,
  "Username"
>;
