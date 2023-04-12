import { GuestsScreenRouteProps } from "./RouteTypes";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import {
  MapNavNavigatorParamList,
  MapStackNavigatorParamList,
  PartyCreationNavigatorParamList,
} from "./NavigationTypes";

export type MapNavigationProps =
  NativeStackNavigationProp<MapStackNavigatorParamList>;

export type MapStackScreenProps<T extends keyof MapStackNavigatorParamList> =
  NativeStackScreenProps<MapStackNavigatorParamList, T>;

export type PartyCreationStackScreenProps<
  T extends keyof PartyCreationNavigatorParamList
> = NativeStackScreenProps<PartyCreationNavigatorParamList, T>;

export type PartyCreationNavigationProps =
  NativeStackNavigationProp<PartyCreationNavigatorParamList>;

export type GuestsScreenNavigationProps = NativeStackScreenProps<
  MapStackNavigatorParamList,
  "Guests"
>;
