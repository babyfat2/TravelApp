import { useCallback, useEffect } from "react";
import useGetMode from "./hooks/GetMode";
import { useNetInfo } from "@react-native-community/netinfo";
import { useAppDispatch, useAppSelector } from "./redux/hooks/hooks";
import { Platform, View, Text } from "react-native";
import * as NavigationBar from "expo-navigation-bar";
import { openToast } from "./redux/slice/toast";
import { useFonts } from "expo-font";
import * as Device from "expo-device";
import * as SplashScreen from "expo-splash-screen";
import * as Linking from "expo-linking";
import DeviceInfo from "react-native-device-info";
import { setHighEnd } from "./redux/slice/prefs";
import { StatusBar } from "expo-status-bar";
import Notifications from "./util/notification";
import { FadeInView } from "./components/global/AnimatedScreen/FadeInView";
import OnboardNavigation from "./routes/OnBroad";
import Main from "./routes/Main";
import Auth from "./routes/Auth";
import AnimatedSplashScreen from "./animatedSplashScreen";

const Navigation = () => {
    const dark = useGetMode();
    const dispatch = useAppDispatch();
    const style = dark ? "light" : "dark";
    const { route } = useAppSelector((state) => state.routes);
    const userAuthenticated = useAppSelector((state) => state.user.token);
    console.log(
      "🚀 ~ file: App.tsx:330 ~ Navigation ~ userAuthenticated:",
      userAuthenticated
    );
  
    const netInfo = useNetInfo();
  
    const barColor = !dark ? "black" : "white";
    useEffect(() => {
      const navBehavior = async () => {
        Platform.OS === "ios"
          ? null
          : await NavigationBar.setBackgroundColorAsync(barColor);
      };
      navBehavior();
    }, [NavigationBar]);
  
    useEffect(() => {
      if (netInfo.isConnected !== null) {
        if (!netInfo.isConnected) {
          dispatch(openToast({ text: "No Internet", type: "Failed" }));
        }
      }
    }, [netInfo]);
  
    useEffect(() => {
      Device.deviceYearClass;
      console.log(
        "🚀 ~ file: App.tsx:351 ~ useEffect ~ Device:",
        Device.modelName
      );
      const getRam = DeviceInfo.getTotalMemorySync();
      console.log("🚀 ~ file: App.tsx:351 ~ useEffect ~ getRam:", getRam);
      const isHighEnd =
        (DeviceInfo.getApiLevelSync() >= 33 && getRam >= 6_442_450_944) ||
        Platform.OS === "ios";
      console.log("🚀 ~ file: App.tsx:446 ~ useEffect ~ isHighEnd:", isHighEnd);
  
      dispatch(setHighEnd({ isHighEnd }));
    }, []);
  
    const [fontsLoaded] = useFonts({
      mulish: require("./assets/fonts/Mulish-Light.ttf"),
      mulishBold: require("./assets/fonts/Mulish-Black.ttf"),
      mulishMedium: require("./assets/fonts/Mulish-Medium.ttf"),
      uberBold: require("./assets/fonts/UberMove-Bold.ttf"),
      instaBold: require("./assets/fonts/Instagram.ttf"),
      jakaraBold: require("./assets/fonts/PlusJakartaSans-ExtraBold.ttf"),
      jakara: require("./assets/fonts/PlusJakartaSans-Medium.ttf"),
    });
    console.log(route);
    const renderRoute = () => {
      if (route === "onBoard") {
        return <OnboardNavigation />;
      } else if (userAuthenticated) {
        return (
          <FadeInView style={{ flex: 1 }}>
            <Main />
          </FadeInView>
        );
      } else if (route === "Auth" || !userAuthenticated) {
        return (
          <FadeInView style={{ flex: 1 }}>
            <Auth />
          </FadeInView>
        );
      }
    };
    const onLayoutRootView = useCallback(async () => {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    }, [fontsLoaded]);
  
    if (!fontsLoaded) {
      return null;
    }
  
    const linking = {
      prefixes: ["https://google.com"],
      config: {
        screens: {
          Main: "/",
          ChatScreen: "messages/:chatId",
          ViewPost: "posts/:postId",
        },
      },
      async getInitialURL() {
        // First, you may want to do the default deep link handling
        // Check if app was opened from a deep link
        const url = await Linking.getInitialURL();
        console.log("🚀 ~ file: App.tsx:277 ~ getInitialURL ~ url:", url);
  
        if (url != null) {
          return url;
        }
  
        // Handle URL from expo push notifications
        const response = await Notifications.getLastNotificationResponseAsync();
        console.log(
          "🚀 ~ file: App.tsx:285 ~ getInitialURL ~ response:",
          response?.notification.request.content.data
        );
  
        return response?.notification.request.content.data.url;
      },
      subscribe(listener: any) {
        const onReceiveURL = ({ url }: { url: string }) => listener(url);
  
        // Listen to incoming links from deep linking
        const eventListenerSubscription = Linking.addEventListener(
          "url",
          onReceiveURL
        );
  
        // Listen to expo push notifications
        const subscription =
          Notifications.addNotificationResponseReceivedListener((response) => {
            const url = response.notification.request.content.data.url;
  
            // Any custom logic to see whether the URL needs to be handled
            //...
  
            // Let React Navigation handle the URL
            listener(url);
          });
  
        return () => {
          // Clean up the event listeners
  
          eventListenerSubscription.remove();
          subscription.remove();
        };
      },
    };
  
    return (
        <AnimatedSplashScreen>
          <StatusBar
            animated={true}
            style={style}
            backgroundColor="transparent"
          />
          {renderRoute()}
        </AnimatedSplashScreen>
    );
  };

export default Navigation;