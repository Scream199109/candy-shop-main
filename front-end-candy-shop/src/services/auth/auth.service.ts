import {getContentType} from "api/api.helper";
import {instance} from "api/api.interceptor";
import axios from "axios";
import {IAuthResponse, IEmailPassword} from "store/user/user.interface";
import {AuthType, TokenEnum} from "types/auth.enum";
import {saveToStorage} from "./auth.helper";

const Cookies = require('js-cookie');

export const AuthService = {
  async main(type: AuthType.LOGIN | AuthType.REGISTER, data: IEmailPassword) {
    const response = await instance<IAuthResponse>({
      url: `/auth/${type}`,
      method: 'POST',
      data
    })

    if (response.data.accessToken) saveToStorage(response.data);
    return response.data
  },

  async getNewTokens() {
    const refreshToken = Cookies.get(TokenEnum.REFRESH_TOKEN);

    const response = await axios.post<string, {data: IAuthResponse}>(
      process.env.SERVER_URL + `/auth/login/${TokenEnum.ACCSESS_TOKEN}`,
      {refreshToken},
      {
        headers: getContentType()
      }
    )

    if (response.data.accessToken) saveToStorage(response.data)
    return response
  }
}
