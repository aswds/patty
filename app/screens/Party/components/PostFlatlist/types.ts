import { Timestamp } from "firebase/firestore";
import { IEvent_User } from "../../../../Types/Events";
import { IUser } from "../../../../Types/User";

export interface IPost {
  id: string;
  media: string;
  user: IEvent_User;
  description: string;
  mehs: string[];
  likes: string[];
  createdAt?: Timestamp | string;
  mediaType: string;
  fileName: string;
}
