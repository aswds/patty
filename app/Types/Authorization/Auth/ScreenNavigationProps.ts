import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { AuthorizationParamList } from "./NavigationTypes";

export type AuthorizationNavigationProp =
  NativeStackNavigationProp<AuthorizationParamList>;
export type AuthorizationStackScreenProps<
  T extends keyof AuthorizationParamList
> = NativeStackScreenProps<AuthorizationParamList, T>;
