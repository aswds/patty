import { FieldValue } from "firebase/firestore";
import { IUser } from "./User";

export interface ICoordinates {
  latitude: number;
  latitudeDelta: number;
  longitude: number;
  longitudeDelta: number;
}
export interface IFullAddress {
  additionalData: { [key: string]: string };
  city: string;
  countryName: string;
  county: string;
  district: string;
  label: string;
  street: string;
  houseNumber?: number;
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

export interface IEvent {
  title?: string;
  description?: string;
  tags?: string[];
  location: ILocation;
  time?: ITime | Date | string;
  rsvp?: RSVP_Types;
  giftRequired?: GiftsRequireTextTypes;
  partyPlace?: PartyPlace;
  foodProvided?: FoodProvided;
  drinksType?: DrinkTypes;
  guests: string[];
  user: IEvent_User;
  partyID?: string;
  createdAt?: Date | FieldValue;
  isViaInvite?: boolean;
}
export interface IGifts {
  required: boolean;
}
export type IEvent_User = Pick<
  IUser,
  "username" | "surname" | "name" | "image" | "uid"
>;
export type RSVP_Types = "Public" | "Via Invite";
export type GiftsRequireTextTypes = "Required" | "Not Required";
export type FoodProvided = "Provided" | "Not Provided";
export type DrinkTypes = "Alcohol" | "Soft";
export type PartyPlace =
  | "House"
  | "Restaurant/Bar"
  | "Club"
  | "Event Space"
  | "Beach/Park";
