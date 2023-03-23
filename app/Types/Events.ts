import { IUser } from "./User";

export interface ICoordinates {
  latitude: number;
  latitudeDelta: number;
  longitude: number;
  longitudeDelta: number;
}
export interface IFullAddress {
  AdditionalData: { [key: string]: string };
  City?: string;
  countryName: string;
  County: string;
  District: string;
  Label: string;
  Street: string;
  HouseNumber?: number;
}

export interface ILocation {
  region?: ICoordinates | null | undefined;
  address?: string | null | undefined;
  fullAddressInfo?: IFullAddress | null | undefined;
}
export interface ITime {
  nanoseconds?: number;
  seconds?: number;
}

export interface IEvent {
  title: string;
  description?: string;
  tags?: string[];
  location?: ILocation;
  time?: ITime | Date;
  access: string;
  guests: string[];
  user: IEvent_User;
  partyID?: string;
}

export type IEvent_User = Pick<
  IUser,
  "username" | "surname" | "name" | "image" | "uid"
>;
