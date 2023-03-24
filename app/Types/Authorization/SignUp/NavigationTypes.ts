import { NavigatorScreenParams } from "@react-navigation/native";

export type SignUpNavNavigatorParamList = {
  SignUp: NavigatorScreenParams<SignUpNavigatorParamList>;
};

type Username = {
  name: string;
  surname: string;
};
type Avatar = Username & {
  imageURI: string;
  username: string;
};

type SignUpScreen = Avatar;

export type SignUpNavigatorParamList = {
  SignUpScreen: SignUpScreen;
  NameInfo: undefined;
  Avatar: Avatar;
  Username: Username;
};
