import {
    combineReducers,
    configureStore,
  } from "@reduxjs/toolkit";
  import routes from "./slice/routes";
  import prefs from "./slice/prefs";
  import bottomSheet from "./slice/bottomSheet";
  import post from "./slice/post";
  import searchPost from "./slice/post/search";
  import searchDestination from "./slice/destination/search";
  import toast from "./slice/toast";
  import { authApi } from "./api/auth";
  
  import user  from "./slice/user";
  import {
    REHYDRATE,
    FLUSH,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    persistReducer,
  } from "redux-persist";
  import chatList from "./slice/chat/chatlist";
  import { userApi } from "./api/user";
  import { servicesApi } from "./api/services";
  import loadingModal from "./slice/modal/loading";
  import searchPeople from "./slice/people/search";
  import followers from "./slice/user/followers";
  import followedPost from "./slice/post/followed";
  import online from "./slice/chat/online";
  import currentPage from "./slice/currentPage";
  // import searchDestination from "./slice/destination/search";
import { chatApi } from "./api/chat";
import { reduxStorage } from "./storage";
import { destinationApi } from "./api/destination";
import destination from "./slice/destination";

const persistConfig = {
  key: "root",
  storage: reduxStorage,
  whitelist: ["routes", "prefs", "user"],
};
  const reducer = combineReducers({
    routes,
    prefs,
    bottomSheet,
    post,
    destination,
    toast,
    loadingModal,
    searchPost,
    searchDestination,
    followers,
    chatlist: chatList,
    online,
    [chatApi.reducerPath]: chatApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [servicesApi.reducerPath]: servicesApi.reducer,
    [destinationApi.reducerPath]: destinationApi.reducer,
    user,
    searchPeople,
    //searchDestination,
    followedPost,
    currentPage,
  });
  const persistedReducer = persistReducer(persistConfig, reducer);
  export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          immutableCheck: false,
          serializableCheck: false,
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      })
        .concat(authApi.middleware)
        .concat(userApi.middleware)
        .concat(servicesApi.middleware)
        .concat(chatApi.middleware)
        .concat(destinationApi.middleware)
  });
  
  export type RootState = ReturnType<typeof store.getState>;
  export type AppDispatch = typeof store.dispatch;
  