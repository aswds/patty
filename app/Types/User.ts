import { Region } from "react-native-maps";
import { ITime, Party_Access_Types } from "./Events";
import { serverTimestamp } from "firebase/firestore";
export interface IUserEvents {
  onEvent?: string;
  eventType: Party_Access_Types;
  eventsCreated: number;
  eventsVisited: number;
}

export interface UserLocation {
  city?: string;
  coords?: Region;
  partyLocation?: string;
  isLocationLoading: boolean;
}

export type UserMediaInformation = Pick<
  IUser,
  "name" | "surname" | "username" | "image" | "uid"
>;

type EditUserFields =
  | "bio"
  | "name"
  | "surname"
  | "image"
  | "username"
  | "email";

export interface EventInvitation {
  from: string[];
  eventID: string;
}
export type NotificationTypes =
  | { type: "follower"; payload: string }
  | {
      type: "invitation";
      payload: EventInvitation;
    };

export interface EditUser extends Pick<IUser, EditUserFields> {}

export interface IUser {
  username?: string;
  userLocation?: UserLocation;
  bio?: string;
  email?: string;
  followers?: string[];
  following?: string[];
  event_invitation?: EventInvitation;
  event_invite_send_to: string[];
  name?: string;
  events: IUserEvents;
  surname?: string;
  image?: string;
  uid?: string;
  isPremium?: boolean;
  verifiedEmail?: boolean;
  createdAt?: ITime;
}
