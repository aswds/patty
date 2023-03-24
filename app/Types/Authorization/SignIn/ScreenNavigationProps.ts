import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SignInNavigatorParamList } from "./NavigationTypes";

export type SignInScreenNavigationProps = NativeStackScreenProps<
  SignInNavigatorParamList,
  "SignInScreen"
>;

export type RecoveryScreenNavigationProps = NativeStackScreenProps<
  SignInNavigatorParamList,
  "Recovery"
>;
