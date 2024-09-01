import React, { useState,  useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Pressable } from "react-native";
import useGetMode from "../../hooks/GetMode";
import { HeartsFocused, HeartUnfocused } from "../icons";
import { useAppSelector } from "../../redux/hooks/hooks";
import { useLikeDestinationMutation } from "@/app/redux/api/destination";


const DestinationDescription = ({
  idDestination,
  name,
  description,
  location,
  clicked,
  setClicked,
}: {
  idDestination: string,
  name: string;
  description: string;
  location: string;
  clicked: boolean;
  setClicked: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const dark = useGetMode();
  const maxLength = 300;
  const [xemthem, setXemthem] = useState(true);
  const [like] = useLikeDestinationMutation();
  const tym = () => {
    like({idDestination: idDestination})
    .unwrap()
    .then((e) => {
      setClicked(!clicked)
    })
    .catch((e) => {
      console.log(e);
    })
  }
  return (
    <View style={styles.container}>
      <Text
        style={[styles.destinationName, { color: dark ? "white" : "black" }]}
      >
        {name}
      </Text>
      <Pressable style={styles.iconContainer} onPress={tym}>
          {clicked ? (
            <HeartsFocused size={30} color={"red"} />
          ) : (
            <HeartUnfocused color={"red"} size={30} />
          )}
      </Pressable>
      <Text style={[styles.textCaption, { color: dark ? "white" : "black" }]}>
        Địa chỉ:{" "}
        <Text style={{ color: dark ? "white" : "black" }}>{location}</Text>
      </Text>
      <Text style={styles.destinationDescription}>
        {description.length > maxLength && xemthem
          ? `${description.substring(0, maxLength)}...`
          : description}
        {description.length > maxLength && (
          <TouchableOpacity onPress={() => setXemthem(!xemthem)}>
            <Text style={styles.toggleText}>
              {xemthem ? "Xem thêm" : "Ẩn bớt"}
            </Text>
          </TouchableOpacity>
        )}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
  destinationName: {
    fontSize: 24,
    fontFamily: "jakaraBold",
  },
  iconContainer: {
    position: "absolute",
    top: 10,
    right: 20,
  },
  destinationDescription: {
    backgroundColor: "#C9C6C6",
    padding: 10,
    borderRadius: 10,
    fontSize: 16,
    marginTop: 5,
  },
  textCaption: {
    fontFamily: "jakaraBold",
    marginTop: 5,
    marginBottom: 5,
  },
  toggleText: {
    fontFamily: "jakaraBold",
    color: "#55AEFF",
  },
});

export default DestinationDescription;
