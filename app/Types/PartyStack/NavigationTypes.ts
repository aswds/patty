import { NavigatorScreenParams } from "@react-navigation/native";
import { IEvent } from "../Events";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type PartyNanNavigatorParamList = {
  PartyNav: NavigatorScreenParams<PartyNavigatorParamList>;
};

export type PartyNavigatorParamList = {
  PartyScreen: {
    partyData: IEvent;
  };
  PostUploadScreen: undefined;
};

export type PartyNavigationScreenProps<
  T extends keyof PartyNavigatorParamList
> = NativeStackScreenProps<PartyNavigatorParamList, T>;
