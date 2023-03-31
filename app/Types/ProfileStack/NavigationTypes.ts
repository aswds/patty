import { IUser } from "../User";
import { NavigatorScreenParams } from "@react-navigation/native";
import { MapStackNavigatorParamList } from "../MapStack/NavigationTypes";

export type ProfileNavNavigatorParamList = {
  ProfileNav: NavigatorScreenParams<ProfileNavigatorParamList>;
};

export type ProfileNavigatorParamList = {
  Profile: {
    current_user?: IUser;
    previous_screen?: "Guests";
  };
  EditProfile: {
    current_user: IUser;
  };
};
