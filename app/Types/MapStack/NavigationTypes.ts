import { ICoordinates, IFullAddress } from "../Type";
import type { IAddress } from "../../screens/Map/ChooseLocation/types";
import { NavigatorScreenParams } from "@react-navigation/native";

export type MapStackNavigatorParamList = {
  Map: undefined;
  PartyCreationStack: NavigatorScreenParams<PartyCreationNavigatorParamList>;
};

export type PartyCreationNavigatorParamList = {
  LocationAndTime: {
    region?: ICoordinates;
    address?: IAddress;
    fullAddressInfo?: IFullAddress;
    userLocation?: ICoordinates | undefined;
    tags: string[];
    title: string;
    description: string;
  };
  ChooseLocation: {
    userLocation?: ICoordinates | undefined;
  };
  GeneralInformation: undefined;
};
