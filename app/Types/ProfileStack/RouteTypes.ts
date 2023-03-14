import { ProfileNavigatorParamList } from "./NavigationTypes";
import { RouteProp } from "@react-navigation/native";

export type ProfileScreenRouteProps = RouteProp<
  ProfileNavigatorParamList,
  "Profile"
>;
export type EditProfileScreenRouteProps = RouteProp<
  ProfileNavigatorParamList,
  "EditProfile"
>;
