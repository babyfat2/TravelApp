import { Dimensions, Text, View } from "react-native";
import useGetMode from "../../hooks/GetMode";

const height = Dimensions.get("window").height / 4;
const width = Dimensions.get("window").width;
export const SkeletonDestination = () => {
  const dark = useGetMode();
  const shimmerColors = dark
    ? ["#4C4C4C", "#696969", "#383838"]
    : ["#ebebeb", "#c5c5c5", "#ebebeb"];

  const backgroundColor = dark ? "#343434" : "#BBBBBB";
  return (
    <View style={{gap: 5}}>
      <View
      style={{width: width, height: height, backgroundColor, gap: 5}}
      />
      
    </View>
  );
};
