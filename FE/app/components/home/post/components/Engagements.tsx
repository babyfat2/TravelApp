import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import LikeButton from "./LikeButton";
import {
  ShareUnfocused,
} from "../../../icons";
import useGetMode from "../../../../hooks/GetMode";
import {
  useLazyLikePostQuery,
} from "../../../../redux/api/services";

export default function Engagements({
  title,
  like,
  comments,
  isLiked,
  id,
}: {
  title?: string;
  like: number;
  comments?: number;
  id: string;
  isLiked: boolean;
}) {
  const dark = useGetMode();
  const isDark = dark;
  const shareColor = isDark ? "#91EC09" : "#639E0B";
  const [likeAmount, setLikeAmount] = useState(() => like);
  const [clicked, setClicked] = useState(() => isLiked);
  const [likePost] = useLazyLikePostQuery();

  const handleClicked = (click: boolean) => {
    setClicked(click);
    likePost({ id });
    if (!clicked) {
      setLikeAmount(likeAmount + 1);
    } else {
      setLikeAmount(likeAmount - 1);
    }
  };



  const color = isDark ? "white" : "black";
  return (
    <View
      style={{
        flexDirection: "row",
        paddingHorizontal: 20,

        alignItems: "center",

        gap: 6,
        justifyContent: "space-between",
      }}
    >
      {title && <Text>{title}</Text>}
      <View style={{ flexDirection: "row", gap: 90 }}>

        <LikeButton
          isLiked={isLiked}
          text={likeAmount.toString()}
          clicked={clicked}
          setClicked={handleClicked}
        />
      </View>
    </View>
  );
}
