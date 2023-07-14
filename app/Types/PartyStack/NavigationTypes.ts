import { NavigatorScreenParams } from "@react-navigation/native";
import { IEvent, MediaItem } from "../Events";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Timestamp } from "firebase/firestore";

export type PartyNanNavigatorParamList = {
  PartyNav: NavigatorScreenParams<PartyNavigatorParamList>;
};

export type PartyNavigatorParamList = {
  PartyScreen: {
    partyData: IEvent;
  };
  PostUploadScreen: {
    media?: MediaItem;
  };
  AddAnnouncementScreen: undefined;
  MediaListToUpload: {
    eventDate: Date | Timestamp;
  };
};

export type PartyNavigationScreenProps<
  T extends keyof PartyNavigatorParamList
> = NativeStackScreenProps<PartyNavigatorParamList, T>;
