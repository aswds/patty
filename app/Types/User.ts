import { Region } from "react-native-maps";
import { ITime } from "./Events";

export interface IUserEvents {
  onEvent: string[];
  eventsCreated: number;
  eventsVisited: number;
}

export interface UserLocation {
  city?: string;
  location?: Region;
}

export interface EditUser {
  username: IUser["username"];
  name: IUser["name"];
  surname: IUser["surname"];
}

export interface IUser {
  username?: string;
  userLocation?: UserLocation;
  bio?: string;
  email?: string;
  following: string[];
  followers: string[];
  name?: string;
  events: IUserEvents;
  surname?: string;
  image?: string;
  uid?: string;
  verifiedEmail?: boolean;
  createdAt?: ITime;
}
