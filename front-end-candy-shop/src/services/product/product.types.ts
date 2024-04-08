import {IProduct} from "types/product.interface";

export const PRODUCTS = 'products';
export const SIMILAR = 'similar';
export const BY_SLUG = 'by-slug';
export const BY_CATEGORY = 'by-category';

export type TypeProductData = {
  name: string;
  price: string;
  description?: string;
  images: string[];
  categotyId: number;
}

export type TypeProductDataFilters = {
  sort?: EnumProductSort;
  searchTerm?: string;
  page?: string | number;
  perPage?: string | number;
}

export enum EnumProductSort {
  HIGH_PRICE = 'high-price',
  LOW_PRICE = 'low-price',
  NEWEST = 'newest',
  OLDEST = 'oldest',
}

export type TypeProducts = {
  products: IProduct[];
}

export type TypePaginationProducts = {
  length: number;
  products: IProduct[];
}
