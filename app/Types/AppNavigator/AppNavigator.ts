import { PartyNavigator } from "./../../navigation/Navigators/PartyStack";
import { MapNavNavigatorParamList } from "../MapStack/NavigationTypes";
import {
  ProfileNavNavigatorParamList,
  ProfileNavigatorParamList,
} from "../ProfileStack/NavigationTypes";
import {
  PartyNanNavigatorParamList,
  PartyNavigatorParamList,
} from "../PartyStack/NavigationTypes";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { NavigatorScreenParams } from "@react-navigation/native";

export type AppNavigatorParamList = ProfileNavNavigatorParamList &
  MapNavNavigatorParamList &
  PartyNanNavigatorParamList;

export type AppNavigatorNavigationProp =
  NativeStackNavigationProp<AppNavigatorParamList>;
