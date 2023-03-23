import { ITime } from "./Events";

export interface IUserEvents {
  onEvent: string[];
  eventsCreated: number;
  eventsVisited: number;
}

export interface IUser {
  username?: string;
  bio?: string;

  email?: string;
  following: string[];
  followers: string[];
  name?: string;
  events: IUserEvents;
  surname?: string;
  image?: string;
  uid?: string;
  verifiedEmail?: boolean;
  createdAt?: ITime;
}
