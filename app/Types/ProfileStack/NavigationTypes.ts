import { IUser } from "../User";
import { NavigatorScreenParams } from "@react-navigation/native";

export type ProfileNavNavigatorParamList = {
  ProfileNav: NavigatorScreenParams<ProfileNavigatorParamList>;
};

export type ProfileNavigatorParamList = {
  Profile: {
    current_user: IUser;
  };
  EditProfile: {
    current_user: IUser;
  };
};
