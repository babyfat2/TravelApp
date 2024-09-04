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
  const borderColor = dark ? "white" : "black";

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
        borderColor,
        borderWidth: 1,
        width: 100,

        borderStyle: "dashed",

        backgroundColor: "#FFFFFF00",
        borderRadius: 10,
        overflow: "hidden",
        height: 50,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Pressable
        onPress={pickImage}
        android_ripple={{ color: rippleColor, foreground: true }}
        style={{
          width: 100,
          height: 50,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 4,
          }}
        >
          <CameraIcon size={20} color={borderColor} />
          <Text style={{ fontFamily: "jakaraBold",color:borderColor }}>Upload</Text>
        </View>
      </Pressable>
    </View>
  );
}
