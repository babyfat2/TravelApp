import { View, Text, Pressable } from "react-native";
import React from "react";
import { CameraIcon } from "../icons";
import * as ImagePicker from 'expo-image-picker';
import useGetMode from "../../hooks/GetMode";
export default function PickImageButton({
  handleSetPhotoPost,
}: {
  handleSetPhotoPost: (mimeType: string, uri: string, size: number) => void;
}) {
  const dark = useGetMode();
  const backgroundColor = dark ? "white" : "black";
  const backgroundColorView = !dark ? "white" : "black";
  const rippleColor = !dark ? "#ABABAB" : "#55555500";

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);
    if (!result.canceled) {
      handleSetPhotoPost(result.assets[0].mimeType , result.assets[0].uri, result.assets[0].width);
    }
  };
  return (
    <View
      style={{
        borderColor: "#B4B4B488",
        borderWidth: 1,
        width: 100,
        backgroundColor: backgroundColorView,
        borderRadius: 10,
        overflow: "hidden",
        height: 100,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Pressable
        onPress={pickImage}
        android_ripple={{ color: rippleColor, foreground: true }}
        style={{
          width: 100,
          height: 100,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CameraIcon color={backgroundColor} size={40} />
      </Pressable>
    </View>
  );
}

