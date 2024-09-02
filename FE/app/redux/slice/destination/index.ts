import { IDestination } from "./../../../types/api";
import { createSlice } from "@reduxjs/toolkit";
import { destinationApi } from "../../api/destination";

export type DestinationState = {
  error: any;
  loading: boolean;
};

const destination = createSlice({
  name: "destination",
  initialState: {
    error: null,
    loading: false,
  } as DestinationState,
  reducers: {
    addDestination: () => {},
    resetDestination: (state) => {
      state.error = null;
      state.loading = false;
    },
  },

  extraReducers: (builder) => {
    builder.addMatcher(
      destinationApi.endpoints.getSingleDestination.matchFulfilled,
      (state, { payload }) => {
        state.error = null;
        state.loading = true;
      }
    );
    builder.addMatcher(
      destinationApi.endpoints.getSingleDestination.matchPending,
      (state, { payload }) => {
        state.error = null;
        state.loading = false;
      }
    );
    builder.addMatcher(
      destinationApi.endpoints.getSingleDestination.matchRejected,
      (state, { payload, error }) => {
        state.error = error;
        state.loading = false;
      }
    );
  },
});

export default destination.reducer;
export const { resetDestination } = destination.actions;
