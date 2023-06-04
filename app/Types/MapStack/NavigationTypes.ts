import { IUser, UserLocation } from "./../User";
import { GiftsRequireTextTypes, IEvent, Party_Access_Types } from "./../Events";
import { ICoordinates, IFullAddress } from "../Events";
import { NavigatorScreenParams } from "@react-navigation/native";
import { IAddress } from "../../screens/Map/PartyCreationScreens/ChooseLocation/types";
import { LatLng } from "react-native-maps";

export type MapNavNavigatorParamList = {
  MapNav: NavigatorScreenParams<MapStackNavigatorParamList>;
};

export type MapStackNavigatorParamList = {
  Map: undefined;
  InvitationScreen: InvitationScreenParamList;

  PartyCreationStack: NavigatorScreenParams<PartyCreationNavigatorParamList>;
  Guests: GuestsNavigatorParamList;
  JoinedEvents: JoinedEventsParamList;
  Party: PartyParamList;
};
type PartyParamList = {
  partyData: IEvent;
};
type InvitationScreenParamList = {
  users?: string[];
};
type GuestsNavigatorParamList = {
  guests: string[];
};
type JoinedEventsParamList = {
  city: IFullAddress["city"];
};

type LocationAndTimeParamList = {
  region?: ICoordinates;
  address?: IAddress;
  addressTitle?: string;
  fullAddressInfo?: IFullAddress;
  userLocation?: ICoordinates | undefined;
};

export type PartyCreationNavigatorParamList = {
  LocationAndTime: LocationAndTimeParamList;
  ChooseLocation: {
    userLocation?: LatLng | undefined;
    city?: UserLocation["city"];
  };
  AdditionalInformation: undefined;
  GeneralInformation?: undefined;
};
