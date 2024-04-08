import {instance} from "api/api.interceptor";
import {IFullUser, IUser} from "types/user.interface";
import {FAVORITES, PROFILE, TypeData, USERS} from "./user.types";

const Cookies = require('js-cookie');

export const UserService = {
  async getProfile() {
    return instance<IFullUser>({
      url: `${USERS}/${PROFILE}`,
      method: 'GET'
    })
  },

  async updateProfile(data: TypeData) {
    return instance<IUser>({
      url: `${USERS}/${PROFILE}`,
      method: 'PUT',
      data
    })
  },

  async toggleFavorite(productId: string | number) {
    return instance<IUser>({
      url: `${USERS}/${PROFILE}/${FAVORITES}/${productId}`,
      method: 'PATCH'
    })
  }
}
