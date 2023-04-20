import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { SignUpNavigatorParamList } from "./NavigationTypes";

export type SignUpNavNavigationProps =
  NativeStackNavigationProp<SignUpNavigatorParamList>;

export type SignUpStackScreenProps<T extends keyof SignUpNavigatorParamList> =
  NativeStackScreenProps<SignUpNavigatorParamList, T>;
