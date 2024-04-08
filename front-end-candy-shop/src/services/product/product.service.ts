import {instance} from "api/api.interceptor";
import {IProduct} from "types/product.interface";
import {BY_CATEGORY, BY_SLUG, PRODUCTS, SIMILAR, TypePaginationProducts, TypeProductData, TypeProductDataFilters} from "./product.types";

export const ProductService = {
  async getAll(queryData = {} as TypeProductDataFilters) {
    const {data} = await instance<TypePaginationProducts>({
      url: PRODUCTS,
      method: 'GET',
      params: queryData
    })
    return data
  },

  async getSimilar(id: string | number) {
    return instance<IProduct[]>({
      url: `${PRODUCTS}/${SIMILAR}/${id}`,
      method: 'GET'
    })
  },

  async getBySlug(slug: string) {
    return instance<IProduct>({
      url: `${PRODUCTS}/${BY_SLUG}/${slug}`,
      method: 'GET'
    })
  },

  async getByCategory(categorySlug: string) {
    return instance<IProduct>({
      url: `${PRODUCTS}/${BY_CATEGORY}/${categorySlug}`,
      method: 'GET'
    })
  },

  async getById(id: string | number) {
    return instance<IProduct>({
      url: `${PRODUCTS}/${id}`,
      method: 'GET'
    })
  },

  async create() {
    return instance<IProduct>({
      url: PRODUCTS,
      method: 'POST'
    })
  },

  async update(id: string | number, data: TypeProductData) {
    return instance<IProduct>({
      url: `${PRODUCTS}/${id}`,
      method: 'PUT',
      data
    })
  },

  async delete(id: string | number) {
    return instance({
      url: `${PRODUCTS}/${id}`,
      method: 'DELETE'
    })
  },
}
