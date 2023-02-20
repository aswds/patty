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
  region: ICoordinates;
  address: string;
  fullAddressInfo: IFullAddress;
}

export interface IDoc {
  title: string;
  tags?: string[];
  location: ILocation;
  time: string;
  access: string;
  number_of_guests: number;
}
