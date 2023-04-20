import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { SignInNavigatorParamList } from "./NavigationTypes";

export type SignInStackScreenProps<T extends keyof SignInNavigatorParamList> =
  NativeStackScreenProps<SignInNavigatorParamList, T>;

export type SignInNavigationProp =
  NativeStackNavigationProp<SignInNavigatorParamList>;
