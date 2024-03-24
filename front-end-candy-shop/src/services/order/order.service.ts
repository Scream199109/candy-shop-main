import {instance} from "api/api.interceptor";
import {IOrder} from "types/order.interface";
import {ORDERS} from "./order.types";

export const OrderService = {
  async getAll() {
    return instance<IOrder[]>({
      url: ORDERS,
      method: 'GET'
    })
  },
}
