import {PayloadAction, createSlice} from "@reduxjs/toolkit";
import {ModalsState} from "types/store/store-state-types";

const initialState: ModalsState = {};

type UpdateModalAction = PayloadAction<{
  modal: string;
  isOpen: boolean;
  data?: any;
}>

const modalSlice = createSlice({
  name: 'modals-reducer',
  reducers: {
    setModalState: (state, {payload: {modal, isOpen, data}}: UpdateModalAction) => {
      state[modal] = {
        isOpen,
        data
      };
    }
  },
  initialState
});


export const {setModalState} = modalSlice.actions;
export default modalSlice;
