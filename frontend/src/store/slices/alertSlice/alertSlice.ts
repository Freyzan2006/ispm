import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export enum EAlertType {
    ERROR,
    SUCCESSFUL,
    WARNING,
    INFO
}

export interface IAlertSlice {
    isActive: boolean,
    time: number,
    type: EAlertType,
    message: string
}

const initialState: IAlertSlice = {
    isActive: false,
    time: 2000,
    type: EAlertType.SUCCESSFUL,
    message: ""
};
  

const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        setShowAlert(state) {
            state.isActive = !state.isActive;
        },
        setTimeAlert(state, actions: PayloadAction<number>) {
            state.time = actions.payload;
        },
        setTypeAlert(state, actions: PayloadAction<EAlertType>) {
            state.type = actions.payload;
        },

        setMessageAlert(state, actions: PayloadAction<string>) {
            state.message = actions.payload;
        }
    },
});
  
export const { setShowAlert, setTimeAlert, setTypeAlert, setMessageAlert } = alertSlice.actions;


export default alertSlice;