interface ICoordinates {
  latitude: string;
  latitudeDelta: string;
  longitude: string;
  longitudeDelta: string;
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
