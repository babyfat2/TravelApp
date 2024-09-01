import { IComment, IDestination } from "@/app/types/api";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

export const destinationApi = createApi({
    reducerPath: "destinationApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.EXPO_PUBLIC_API_URL}/api/destination`,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).user.token;
            // If we have a token, set it in the header
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ["destination"],
    endpoints: (builder) => ({
        getAllDestination: builder.query<
            IDestination[],
            null
        >({
            query: () => `/all-destination`,
            extraOptions: {maxRetries: 2}
        }),
        getSingleDestination: builder.query<
            IDestination,
            string
        >({
            query: (idDestination) => `/single-destination?idDestination=${idDestination}`,
            extraOptions: {maxRetries: 2}
        }),
        likeDestination: builder.mutation<
        null,
        {idDestination: string}
        > ({
            query: (payload) => ({
              url: "/like-destination",
              method: "POST",
              body: payload,
              headers: {
                "Content-type": "application/json; charset=UTF-8",
              },
            }),
          }),
          allCommentDestination: builder.query<
          {
            msg: String,
          allCommentDestination:IComment[]
        },
          string
          >({
          query: (idDestination) => `/all-comment-destination?idDestination=${idDestination}`,
          extraOptions: {maxRetries: 2}
            }),
        commentDestination: builder.mutation<
        null,
        {comment: string, idDestination: string}
        > ({
            query: (payload) => ({
              url: "/comment-destination",
              method: "POST",
              body: payload,
              headers: {
                "Content-type": "application/json; charset=UTF-8",
              },
            }),
          }),
          getDestinationLikeByUser: builder.query<
            IDestination[],
            null
        >({
            query: () => `/destination-like-by-user`,
            extraOptions: {maxRetries: 2}
        }),
        searchDestination: builder.query<{ Destinations: IDestination[] }, { q: string }>({
          query: ({ q }) => `/search-destination?q=${q}`,
          extraOptions: { maxRetries: 0 },
        }),
    }),
});

export const { 
  useGetAllDestinationQuery, 
  useLazyGetSingleDestinationQuery, 
  useLikeDestinationMutation , 
  useLazyAllCommentDestinationQuery, 
  useCommentDestinationMutation, 
  useLazyGetDestinationLikeByUserQuery
} = destinationApi;