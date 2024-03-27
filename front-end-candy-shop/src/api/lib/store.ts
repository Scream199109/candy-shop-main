
import {combineReducers, configureStore} from "@reduxjs/toolkit";

import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE
} from 'redux-persist';

import storage from "redux-persist/lib/storage";
import {store} from "store/store";
import {userSlice} from "store/user/user.slice";

const persistConfig = {
  key: 'candy-shop',
  storage,
  whitelist: ['cart']
}

const rootReducer = combineReducers({
  user: userSlice.reducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const makeStore = () => {
  return configureStore({
    reducer: persistedReducer,
    middleware: getDefaulMiddleware =>
      getDefaulMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        }
      })
  })
}

export const persistor = persistStore(store);

export type TypeRootState = ReturnType<typeof rootReducer>;

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
