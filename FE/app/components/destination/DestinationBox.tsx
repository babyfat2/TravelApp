import { IDestination } from "@/app/types/api";
import React from "react";
import { Dimensions, TouchableOpacity, Image, Text } from "react-native";

const height = Dimensions.get("window").height / 4;
const width = Dimensions.get("window").width;

const DestinationBox = ({ destination, onPress }: { destination: IDestination, onPress : () => void  }) => (
    <TouchableOpacity
      style={{
        backgroundColor: "#b0b1b8",
        margin: 5,
        borderRadius: 15,
        overflow: "hidden",
      }}
      onPress={onPress}
    >
      {destination.images[0] ? (
      <Image
        source={{ uri: destination.images[0].imageUri }} // Use image URL from API
        style={{
          height: 150,
          width: Dimensions.get("window").width * 0.475,
        }}
        resizeMode="cover"
      />
      ) : (
      <Image
       source={require("@/assets/images/react-logo.png")}
       style={{
        height: 150,
        width: Dimensions.get("window").width * 0.475,
      }}
      resizeMode="cover"
      />
      ) }
      <Text
        style={{
          textAlign: "center",
          fontWeight: "bold",
          color: "#fff",
          backgroundColor: "#34c3eb",
          padding: 10,
        }}
      >
        {destination.name}
      </Text>
    </TouchableOpacity>
  );
export default DestinationBox;
