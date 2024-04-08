
import {combineReducers, configureStore} from "@reduxjs/toolkit";

import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore
} from 'redux-persist';

import storage from "redux-persist/lib/storage";
import cartSlice from "store/cart/cart.slice";
import modalSlice from "store/modal/modal.slice";
import {userSlice} from "store/user/user.slice";
import {StoreState} from "types/store/store-state-types";

const persistConfig = {
  key: 'candy-shop',
  storage,
  whitelist: ['cart']
}

const rootReducer = combineReducers({
  user: userSlice.reducer,
  modals: modalSlice.reducer,
  cart: cartSlice.reducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const makeStore = () => {
  return configureStore<StoreState>({
    reducer: persistedReducer,
    middleware: getDefaulMiddleware =>
      getDefaulMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        }
      })
  })
}

export const persistor = persistStore(makeStore());

export type TypeRootState = ReturnType<typeof rootReducer>;

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
