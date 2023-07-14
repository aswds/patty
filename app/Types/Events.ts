import { LocationGeocodedAddress } from "expo-location";
import { FieldValue, Timestamp } from "firebase/firestore";
import { IUser } from "./User";
import { MediaTypeValue } from "expo-media-library";

export interface ICoordinates {
  latitude: number;
  latitudeDelta: number;
  longitude: number;
  longitudeDelta: number;
}
export interface IFullAddress extends Omit<LocationGeocodedAddress, "country"> {
  countryName: string;
  county?: string;
  label?: string;
  partyLocation?: string;
}

export interface ILocation {
  region: ICoordinates | null | undefined;
  address?: string | null | undefined;
  fullAddressInfo: IFullAddress | null | undefined;
}
export interface ITime {
  nanoseconds?: number;
  seconds?: number;
}

export interface EventColors {
  intimateGathering: string;
  mediumGathering: string;
  largeGathering: string;
}

export interface IEvent {
  title?: string;
  description?: string;
  tags?: string[];
  location: ILocation;
  time?: ITime | Date | string;
  party_access?: Party_Access_Types;
  giftRequired?: GiftsRequireTextTypes;
  partyPlace?: PartyPlace;
  foodProvided?: FoodProvided;
  drinksType?: DrinkTypes;
  guests: string[];
  user: IEvent_User;
  partyID?: string;
  createdAt?: Date | FieldValue;
  isViaInvite?: boolean;
  radiusToPost: number;
}
export interface IGifts {
  required: boolean;
}
export type IEvent_User = Pick<
  IUser,
  "username" | "surname" | "name" | "image" | "uid"
>;
export type Party_Access_Types = "Public" | "Via Invite";
export type GiftsRequireTextTypes = "Required" | "Not Required";
export type FoodProvided = "Provided" | "Not Provided";
export type DrinkTypes = "Alcohol" | "Soft";
export type PartyPlace =
  | "House"
  | "Restaurant/Bar"
  | "Club"
  | "Event Space"
  | "Beach/Park";
export type AnnouncementType = {
  createdAt?: Timestamp;
  user: IEvent_User;
  title: string;
  announcement: string;
  id?: string;
};
export interface MediaItem {
  id: string;
  duration?: string | number;
  uri: string;
  mediaType: MediaTypeValue;
  selected?: boolean;
}
