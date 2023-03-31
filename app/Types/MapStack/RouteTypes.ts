import { RouteProp } from "@react-navigation/native";
import type { MapStackNavigatorParamList } from "./NavigationTypes";

export type GuestsScreenRouteProps = RouteProp<
  MapStackNavigatorParamList,
  "Guests"
>;

export type JoinedEventsRouteProps = RouteProp<
  MapStackNavigatorParamList,
  "JoinedEvents"
>;
