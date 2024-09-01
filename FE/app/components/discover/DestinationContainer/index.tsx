import { View, Text, Dimensions, Pressable } from "react-native";

import Animated, { FadeInLeft } from "react-native-reanimated";
import { useState } from "react";
import { IDestination, IPerson } from "../../../types/api";
import { useLazyFollowUserQuery } from "../../../redux/api/services";
import { useAppSelector } from "../../../redux/hooks/hooks";
import useGetMode from "../../../hooks/GetMode";
import { ProfileIcon } from "../../icons";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { DestinationNavigationProp, HomeNavigationProp } from "../../../types/navigation";

const { width } = Dimensions.get("window");
export default function DestinationContainer({
  name,
  location,
  id,
  images,
}: IDestination) {
  const navigation = useNavigation<HomeNavigationProp>();

  const dark = useGetMode();
  const color = dark ? "white" : "black";
  const backgroundColor = !dark ? "#E5E9F899" : "#25252599";
  const nbuttonBackgroundColor = !dark ? "#FFFFFF" : "#000000";
  const fbuttonBackgroundColor = dark ? "#FFFFFF" : "#000000";
  const nBColor = !dark ? "white" : "black";
  const fBColor = dark ? "white" : "black";
  return (
    <Pressable
      onPress={() => {
        navigation.navigate("DestinationDetail", { destinationId: id});
      }}
    >
      <Animated.View
        entering={FadeInLeft.springify()}
        style={{
          width: "100%",
          overflow: "hidden",
          justifyContent: "space-between",
          padding: 6,
          alignItems: "center",
          flexDirection: "row",
          backgroundColor,
          borderRadius: 20,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          {images[0].imageUri ? (
            <Image
              source={{ uri: images[0].imageUri }}
              style={{ height: 30, width: 30, borderRadius: 9999 }}
            />
          ) : (
            <ProfileIcon color={color} size={34} />
          )}
          <View>
            <Text style={{ fontSize: 16, fontFamily: "mulishBold", color }}>
              {name}
            </Text>
            <Text style={{ fontFamily: "jakara", fontSize: 12, color }}>
              Location:{location}
            </Text>
          </View>
        </View>
      </Animated.View>
    </Pressable>
  );
}
