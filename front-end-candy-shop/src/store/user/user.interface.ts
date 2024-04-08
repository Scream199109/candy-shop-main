import {IUser} from "types/user.interface";

export interface IUserState {
  email: string;
}
export interface ITokens {
  accessToken: string;
  refreshToken: string;
}

export interface IInitialState {
  user: IUserState | null;
  isLoading: boolean;
}

export interface IEmailPassword {
  email: string;
  password: string;
}

export interface IRegisterData extends IEmailPassword {
  phone: string;
  name: string;
}

export interface IAuthResponse extends ITokens {
  user: IUser;
}

