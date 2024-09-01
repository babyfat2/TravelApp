import { Text, View, Dimensions, Pressable, ScrollView} from "react-native";
import React, { useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import Notifications from "./util/notification";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store } from "./redux/store";
import { PaperProvider } from "react-native-paper";
import { persistStore } from "redux-persist";
import Navigation from "./navigation";
import { LoadingModal } from "./components/global/Modal/LoadingOverlay";
import CustomToast from "./components/global/Toast";


const persistor = persistStore(store);
SplashScreen.preventAutoHideAsync();


export default function Index() {
  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log("🚀😒🚀", notification.request.content.data);
      }
    );
    const subscriptionResponse =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("response", response.actionIdentifier);
        console.log(
          "🚀 ~ file: App.tsx:81 ~ Notifications.addNotificationResponseReceivedListener ~ response:"
        );
        if (response.actionIdentifier === "message") {
          const userText = response.userText;
          console.log(
            "🚀✅✅ ~ file: App.tsx:83 ~ Notifications.addNotificationResponseReceivedListener ~ userText:",
            userText
          );
        }
      });

    Notifications.getNotificationCategoriesAsync().then((e) => {
      console.log(e[0]);
    });
    return () => {
      subscription.remove();
      subscriptionResponse.remove();
    };
  }, []);
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <PaperProvider>
          <CustomToast />
          <LoadingModal />
          <Navigation />
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
}
