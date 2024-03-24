import {combineReducers, configureStore} from "@reduxjs/toolkit";

import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  PURGE,
  REGISTER,
  REHYDRATE
} from 'redux-persist';
import persistStore from "redux-persist/es/persistStore";

import storage from "redux-persist/lib/storage";
import {userSlice} from "./user/user.slice";

const persistConfig = {
  key: 'candy-shop',
  storage,
  whitelist: ['cart']
}


const rootReducer = combineReducers({
  user: userSlice.reducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaulMiddleware =>
    getDefaulMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
})

export const persistor = persistStore(store);

export type TypeRootState = ReturnType<typeof rootReducer>;
