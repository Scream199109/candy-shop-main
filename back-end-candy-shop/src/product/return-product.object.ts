import {Prisma} from "@prisma/client";
import {categoryReturnObject} from "src/category/return-category.object";
import {reviewReturnObject} from "src/review/return-review.object";

export const productReturnObject: Prisma.ProductSelect = {
  id: true,
  name: true,
  price: true,
  description: true,
  slug: true,
  images: true,
  createdAt: true,
  category: {select: categoryReturnObject},
  reviews: {
    select: reviewReturnObject
  }
}
