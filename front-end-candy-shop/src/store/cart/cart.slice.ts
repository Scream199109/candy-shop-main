import {PayloadAction, createSlice} from "@reduxjs/toolkit";
import {IAddToCartPayload, ICartInitialState, IChangeQuantityPayload} from "./cart.types";

const initialState: ICartInitialState = {
  items: []
};

const cartSlice = createSlice({
  name: 'cart-reducer',
  reducers: {
    addToCart: (state, action: PayloadAction<IAddToCartPayload>) => {
      const isExist = state.items.some(item => item.id === action.payload.product.id);

      if (!isExist) {
        state.items.push({...action.payload, id: state.items.length})
      }
    },
    removeFromCart: (state, action: PayloadAction<{id: number}>) => {
      state.items = state.items.filter(item => item.id !== action.payload.id)
    },
    changeQuantity: (state, action: PayloadAction<IChangeQuantityPayload>) => {
      const {id, type} = action.payload;
      const item = state.items.find(item => item.id == id);
      if (item) type === 'plus' ? item.quantity += 1 : item.quantity -= 1;
    },
    reset: state => {
      state.items = [];
    }
  },
  initialState
})


export default cartSlice;
