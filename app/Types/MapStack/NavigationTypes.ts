import { IUser } from "./../User";
import { IEvent } from "./../Events";
import { ICoordinates, IFullAddress } from "../Events";
import { NavigatorScreenParams } from "@react-navigation/native";
import { IAddress } from "../../screens/Map/PartyCreationScreens/ChooseLocation/types";

export type MapNavNavigatorParamList = {
  MapNav: NavigatorScreenParams<MapStackNavigatorParamList>;
};

export type MapStackNavigatorParamList = {
  Map: undefined;
  PartyCreationStack: NavigatorScreenParams<PartyCreationNavigatorParamList>;
  Guests: GuestsNavigatorParamList;
  JoinedEvents: JoinedEventsParamList;
};

type GuestsNavigatorParamList = {
  guests: string[];
  guest: IUser;
};
type JoinedEventsParamList = {
  city: IFullAddress["city"];
};

export type PartyCreationNavigatorParamList = {
  LocationAndTime: {
    region?: ICoordinates;
    address?: IAddress;
    addressTitle?: string;
    fullAddressInfo?: IFullAddress;
    userLocation?: ICoordinates | undefined;
    tags?: string[];
    title?: string;
    description?: string;
  };
  ChooseLocation: {
    userLocation?: ICoordinates | undefined;
  };
  GeneralInformation?: undefined;
};
