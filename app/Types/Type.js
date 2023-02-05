interface ICoordinates {
  latitude: string;
  latitudeDelta: string;
  longitude: string;
  longitudeDelta: string;
}
interface IFullAddress {
  AdditionalData: { [key: string]: string };
  City: string;
  Country: string;
  County: string;
  District: string;
  Label: string;
  Street: string;
}

interface ILocation {
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
}
