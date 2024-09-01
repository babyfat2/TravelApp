import { StatusBar } from "expo-status-bar";
import { Text, View, Platform } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { ReactNode, useCallback, useEffect, useState } from "react";
import Animated, {
  BounceOutDown,
  FadeOut,
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import useGetMode from "./hooks/GetMode";

function AnimatedSplashScreen({ children }: { children: ReactNode }) {
    const isAnimationCompleteForTravel = useSharedValue(false);
    const isAllAnimationComplete = useSharedValue(false);
    const [isAppReady, setAppReady] = useState(false);
  
    const onImageLoaded = useCallback(async () => {
      setTimeout(async () => {
        try {
          await SplashScreen.hideAsync();
          // Load stuff
          await Promise.all([]);
        } catch (e) {
          // handle errors
        } finally {
          setAppReady(true);
        }
      }, 2000);
    }, []);
    const dark = useGetMode();
    const backgroundColor = dark ? "black" : "white";
    const color = !dark ? "black" : "white";
    const style = dark ? "light" : "dark";
  
    const offset = useSharedValue(0);
    const opacityK = useSharedValue(0);
    const offsetK = useSharedValue(0);
    const backgroundColorOffset = useSharedValue("black");
  
    const animatedStyles = useAnimatedStyle(() => {
      return {
        transform: [
          {
            translateX: withDelay(
              1000,
              withTiming(
                offset.value,
  
                {
                  duration: 400,
                },
                () => {
                  isAnimationCompleteForTravel.value = true;
                }
              )
            ),
          },
        ],
      };
    });
    const animatedStylesK = useAnimatedStyle(() => {
      return {
        opacity: withTiming(opacityK.value),
        transform: [
          {
            translateX: withTiming(
              offsetK.value,
  
              {},
              () => {
                isAllAnimationComplete.value = true;
              }
            ),
          },
        ],
      };
    });
    const animateBackgroundEntryStyle = useAnimatedStyle(() => {
      return {
        backgroundColor: withTiming(backgroundColorOffset.value, {
          duration: 2000,
        }),
      };
    });
    useEffect(() => {
      offset.value = -40;
      backgroundColorOffset.value = backgroundColor;
    }, [backgroundColor]);
  
    function callback() {
      "worklet";
      runOnJS(onImageLoaded)();
    }
  
    useAnimatedReaction(
      () => {
        return isAnimationCompleteForTravel.value;
      },
      (result) => {
        if (result) {
          opacityK.value = 1;
          offsetK.value = -40;
        }
      }
    );
    useAnimatedReaction(
      () => {
        return isAllAnimationComplete.value;
      },
      (result) => {
        if (result) {
          callback();
        }
      }
    );
  
    //Travel animation
    return (
      <View style={{ flex: 1 }}>
        <StatusBar animated={true} style={style} backgroundColor="transparent" />
        {isAppReady && children}
        {!isAppReady && (
          <Animated.View
            exiting={FadeOut.duration(800)}
            pointerEvents="none"
            style={[
              {
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor,
              },
              animateBackgroundEntryStyle,
            ]}
          >
            {/* <Animated.Image
              style={{
                width: "100%",
                height: "100%",
                resizeMode: "contain",
              }}
              exiting={BounceOutDown.duration(400)}
              source={image}
              onLoadEnd={onImageLoaded}
              fadeDuration={0}
            /> */}
            <Animated.View
              exiting={BounceOutDown.duration(800)}
              style={{
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                justifyContent: "center",
  
                alignItems: "center",
                width: "100%",
                aspectRatio: 1278 / 2278,
                flexDirection: "row",
              }}
            >
              <Animated.Text
                style={[
                  {
                    fontFamily: "uberBold",
                    fontSize: 110,
                    paddingLeft: 60,
                    textAlign: "center",
                    color,
                  },
                  animatedStyles,
                ]}
              >
                T
              </Animated.Text>
              <Animated.Text
                style={[
                  {
                    fontFamily: "uberBold",
                    fontSize: 110,
                    color,
                    textAlign: "center",
                  },
                  animatedStylesK,
                ]}
              >
                ravel
              </Animated.Text>
            </Animated.View>
            <Animated.View
              style={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                position: "absolute",
                bottom: 0,
                marginBottom: 20,
              }}
            ></Animated.View>
          </Animated.View>
        )}
      </View>
    );
  }

  export default AnimatedSplashScreen;