import { Text, Pressable } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import AnimatedScreen from "../../components/global/AnimatedScreen";
import useGetMode from "../../hooks/GetMode";
import { useAppDispatch } from "../../redux/hooks/hooks";
import { useTokenValidQuery } from "../../redux/api/user";
import { signOut } from "../../redux/slice/user";
import Animated, { FadeInRight, FadeOutRight } from "react-native-reanimated";
import { DrawerHomeProp } from "../../types/navigation";
import HomeAll from "./HomeScreens/HomeAll";
import HomeFollowed from "./HomeScreens/HomeFollowed";

export default function Home({ navigation }: DrawerHomeProp) {
  const dark = useGetMode();
  const isDark = dark;
  const color = isDark ? "white" : "black";
  const dispatch = useAppDispatch();
  const [isAll, setIsAll] = useState(true);
  const userAuthValidate = useTokenValidQuery(null);

  useEffect(() => {
    //@ts-ignore
    if (userAuthValidate.isError) {
      dispatch(signOut());
    }
  }, [userAuthValidate]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <Pressable
            onPress={() => {
              setIsAll(!isAll);
            }}
            style={{
              marginRight: 15,
              borderColor: color,
              borderWidth: 0.7,
              padding: 5,
              borderRadius: 10,
              borderStyle: "dotted",
            }}
          >
            {isAll ? (
              <Animated.View
                key={"all"}
                entering={FadeInRight.springify()}
                exiting={FadeOutRight.springify()}
              >
                <Text style={{ fontFamily: "uberBold", fontSize: 14, color }}>
                  {"All Posts"}
                </Text>
              </Animated.View>
            ) : (
              <Animated.View
                key={"followed"}
                entering={FadeInRight.springify()}
                exiting={FadeOutRight.springify()}
              >
                <Text style={{ fontFamily: "uberBold", fontSize: 14, color }}>
                  {"Followed Posts"}
                </Text>
              </Animated.View>
            )}
          </Pressable>
        );
      },
    });
  }, [color, isAll]);

  return (
    <AnimatedScreen>{isAll ? <HomeAll /> : <HomeFollowed />}</AnimatedScreen>
  );
}
