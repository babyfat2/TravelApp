import { View, Text, Dimensions, } from "react-native";

import Animated, { FadeInLeft } from "react-native-reanimated";
import useGetMode from "../../../hooks/GetMode";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
console.log("🚀 ~ file: OnboardBuilder.tsx:10 ~ width:", width);
export default function OnboardBuilder({
  header,
  subText,
  quote,
}: {
  header: string;
  subText: string;
  quote: string;
}) {
  const dark = useGetMode();
  const color = !dark ? "black" : "white";

  return (
    <View style={{ width }}>
      <Animated.View
        entering={FadeInLeft.delay(200)}
        style={{
          width: "90%",
          justifyContent: "center",
          height: height / 2.5,
        }}
      ></Animated.View>
      <Text
        style={{ fontFamily: "mulishBold", fontSize: 36, width: 300, color }}
      >
        {header}
      </Text>
      <Text style={{ fontSize: 26, fontFamily: "mulish", color: "#929292" }}>
        {subText}
      </Text>
      <Text
        style={{
          fontSize: 12,
          fontFamily: "mulish",
          color: "#929292",
          width: "70%",
        }}
      >
        {quote}
      </Text>
    </View>
  );
}
