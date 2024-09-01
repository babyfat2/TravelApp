import { IDestination } from "./../../../types/api";
import { createSlice } from "@reduxjs/toolkit";
import { destinationApi } from "../../api/destination";

export type destinationState = {
  data: IDestination[];
  error: any;
  loading: boolean;
};

const searchDestination = createSlice({
  name: "searchDestination",
  initialState: {
    data: [],
    error: null,
    loading: false,
  } as destinationState,
  reducers: {
    addDestinaiton: () => {},
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      destinationApi.endpoints.searchDestination.matchFulfilled,
      (state, { payload }) => {
        state.data = payload.Destinations;
        state.error = null;
        state.loading = false;
      }
    );
    builder.addMatcher(
      destinationApi.endpoints.searchDestination.matchPending,
      (state, { payload }) => {
        state.data = [];
        state.error = null;
        state.loading = true;
      }
    );
    builder.addMatcher(
     destinationApi.endpoints.searchDestination.matchRejected,
      (state, { payload, error }) => {
        state.data = [];
        state.error = error;
        state.loading = false;
      }
    );
  },
});

export default searchDestination.reducer;
