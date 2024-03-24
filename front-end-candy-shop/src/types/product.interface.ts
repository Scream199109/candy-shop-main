import {ICategory} from "./category.interface";
import {IReview} from "./review.interface";

export interface IProduct {
  id: number;
  name: string;
  price: number;
  description: string;
  slug: string;
  images: string[];
  createdAt: string;
  category: ICategory;
  reviews: IReview[];
}

export interface IProductDetails {
  product: IProduct;
}
