import { RouteProp } from "@react-navigation/native";
import { SignUpNavigatorParamList } from "./NavigationTypes";

export type SignUpRouteProps = RouteProp<
  SignUpNavigatorParamList,
  "SignUpScreen"
>;
export type AvatarRouteProps = RouteProp<SignUpNavigatorParamList, "Avatar">;
export type UsernameRouteProps = RouteProp<
  SignUpNavigatorParamList,
  "Username"
>;
