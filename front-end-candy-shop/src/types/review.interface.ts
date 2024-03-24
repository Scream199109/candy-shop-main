import {IUser} from "./user.interface";

export interface IReview {
  user: {
    select: IUser;
  },
  createdAt: string;
  id: number;
  rating: number;
  text: string;
}
