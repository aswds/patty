import { ICoordinates, IFullAddress } from "./Type";
import type { IAddress } from "../screens/Map/ChooseLocation/types";

export type MapStackNavigatorParamList = {
  PartyCreationScreen: {
    region: ICoordinates;
    address: IAddress;
    fullAddressInfo: IFullAddress;
    userLocation: ICoordinates;
  };
  ChooseLocation: {
    userLocation: ICoordinates;
  };
};
