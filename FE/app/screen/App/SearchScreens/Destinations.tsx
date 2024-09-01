import { View, } from "react-native";
import React, { useEffect, useState } from "react";
import Animated, {
  FadeInLeft,
  cancelAnimation,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { FlashList } from "@shopify/flash-list";
import { ActivityIndicator } from "react-native-paper";
import useGetMode from "../../../hooks/GetMode";
import { PostSearchSkeleton } from "../../../components/discover/Skeleton/PostSearchSkeleton";
import { useAppSelector } from "../../../redux/hooks/hooks";
import DestinationContainer from "@/app/components/discover/DestinationContainer";

export default function Destinations() {
  const Destinations = useAppSelector((state) => state.searchDestination);
  console.log(Destinations.data);
  const [showLoading, setShowLoading] = useState(Destinations?.data?.length > 8);
  const dark = useGetMode();
  const color = dark ? "white" : "black";
  const acolor = !dark ? "white" : "black";
  const handleStopLoading = () => {
    setShowLoading(false);
  };

  function callback() {
    "worklet";
    runOnJS(handleStopLoading)();
  }

  const opacity = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(opacity.value, [0, 1], [1, 0]),
    };
  });

  useEffect(() => {
    opacity.value = withRepeat(withTiming(1, { duration: 900 }), -1, true);
    return () => {
      cancelAnimation(opacity);
    };
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Animated.View
        entering={FadeInLeft.withCallback(callback)
          .springify()
          .delay(Destinations?.data?.length > 8 ? 400 : 0)}
        style={{ flex: 1 }}
      >
        {Destinations.loading && (
          <Animated.View style={[{ gap: 5, padding: 10 }, animatedStyle]}>
            {[0, 1, 2].map((idx) => (
              <PostSearchSkeleton key={idx} />
            ))}
          </Animated.View>
        )}
        <FlashList
          data={Destinations.data}
          showsVerticalScrollIndicator={false}
          estimatedItemSize={100}
          contentContainerStyle={{
            paddingTop: 20,
            paddingBottom: 100,
            paddingHorizontal: 10,
          }}
          renderItem={({ item }) => (
            <DestinationContainer 
            name={item.name}
            location={item.location}
            id={item.id}
            images={item.images}
            description={item.description}
            likes={item.likes}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </Animated.View>
      {showLoading && (
        <Animated.View
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
          }}
        >
          <ActivityIndicator color={acolor} size={40} />
        </Animated.View>
      )}
    </View>
  );
}
