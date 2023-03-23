import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import {
  MapStackNavigatorParamList,
  PartyCreationNavigatorParamList,
} from "./NavigationTypes";

export type MapNavigationProps =
  NativeStackNavigationProp<MapStackNavigatorParamList>;

export type PartyCreationNavigationProps =
  NativeStackNavigationProp<PartyCreationNavigatorParamList>;

export type MapScreenNavigationProps = NativeStackScreenProps<
  MapStackNavigatorParamList,
  "Map"
>;
export type GeneralInformationScreenNavigationProps = NativeStackScreenProps<
  PartyCreationNavigatorParamList,
  "GeneralInformation"
>;
export type LocationAndTimeScreenNavigationProps = NativeStackScreenProps<
  PartyCreationNavigatorParamList,
  "LocationAndTime"
>;
export type ChooseLocationScreenNavigationProps = NativeStackScreenProps<
  PartyCreationNavigatorParamList,
  "ChooseLocation"
>;
