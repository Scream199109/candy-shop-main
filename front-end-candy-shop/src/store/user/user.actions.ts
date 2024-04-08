import {createAsyncThunk} from "@reduxjs/toolkit";
import {errorCatch} from "api/api.helper";
import {removeFromStorage} from "services/auth/auth.helper";
import {AuthService} from "services/auth/auth.service";
import {AuthType} from "types/auth.enum";
import {IAuthResponse, IEmailPassword, IRegisterData} from "./user.interface";


// register
export const register = createAsyncThunk<IAuthResponse, IRegisterData>(
  'auth/register',
  async (data, thunkApi) => {
    try {
      const response = await AuthService.main(AuthType.REGISTER, data);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error)
    }
  }
)

// login
export const login = createAsyncThunk<IAuthResponse, IEmailPassword>(
  'auth/login',
  async (data, thunkApi) => {
    try {
      const response = await AuthService.main(AuthType.LOGIN, data);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error)
    }
  }
)

// logout
export const logout = createAsyncThunk('auth/logout', async () => removeFromStorage());


//checkAuth
export const checkAuth = createAsyncThunk<IAuthResponse>('auth/check-auth',
  async (_, thunkApi) => {
    try {
      const response = await AuthService.getNewTokens();
      return response.data;
    } catch (error) {
      if (errorCatch(error) === 'jwt expired') {
        thunkApi.dispatch(logout())
      }
      return thunkApi.rejectWithValue(error)
    }
  }
)
