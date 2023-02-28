export interface ICoordinates {
  latitude: number;
  latitudeDelta: number;
  longitude: number;
  longitudeDelta: number;
}
export interface IFullAddress {
  AdditionalData: { [key: string]: string };
  City: string;
  Country: string;
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

export interface IDoc {
  title: string;
  description?: string;
  tags?: string[];
  location?: ILocation;
  time: ITime | undefined;
  access: string;
  number_of_guests: number;
  user?: string;
}
