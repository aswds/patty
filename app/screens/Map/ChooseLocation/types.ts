export interface IAddress {
  Address: IAddressInfo;
}

export interface IAddressInfo {
  countryCode: string;
  countryName: string;
  city: string;
  district: string;
  street: string;
  postalCode: string;
  houseNumber: string;
  county: string;
}
