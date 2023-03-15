import { ITime } from "./Events";

export interface IUser {
  username?: string;
  bio?: string;

  email?: string;
  following: string[];
  followers: string[];
  name?: string;
  surname?: string;
  image?: string;
  uid?: string;
  verifiedEmail?: boolean;
  createdAt?: ITime;
  eventsCreated: number;
  partiesVisited: number;
}
