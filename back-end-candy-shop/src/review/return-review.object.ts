import {Prisma} from "@prisma/client";
import {returnUserObject} from "src/user/return-user.object";

export const reviewReturnObject: Prisma.ReviewSelect = {
  user: {
    select: returnUserObject
  },
  createdAt: true,
  id: true,
  rating: true,
  text: true,
}
