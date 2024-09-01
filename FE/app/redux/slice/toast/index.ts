import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import * as Haptics from "expo-haptics";
import { Platform } from "react-native";

export type ToastState = {
  text: string | null;
  imageUri?: string;
  open: boolean;
  type: "Failed" | "Success" | "Info" | "Message" | null;
};

const toastSlice = createSlice({
  name: "Toast",
  initialState: {
    text: null,
    open: false,
    type: null,
  } as ToastState,
  reducers: {
    openToast: (
      state,
      action: PayloadAction<{
        text: string;
        imageUri?: string;
        type: "Failed" | "Success" | "Info" | "Message";
      }>
    ) => {
      state.open = true;
      state.imageUri = action.payload.imageUri;
      state.text = action.payload.text;
      state.type = action.payload.type;
    },
    closeToast: (state) => {
      state.open = false;
      state.text = null;
      state.type = null;
    },
  },
});

export default toastSlice.reducer;
export const { openToast, closeToast } = toastSlice.actions;
