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
};

type GuestsNavigatorParamList = {
  guests: string[];
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
