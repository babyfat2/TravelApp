import { View, Text, useColorScheme, Pressable, Keyboard } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import LikeButton from "./LikeButton";
import {
  ActivityUnfocused,
  HeartUnfocused,
  HeartsFocused,
  Love,
  MessageUnfocused,
  MessagesIcon,
  ShareUnfocused,
} from "../../../icons";
import useGetMode from "../../../../hooks/GetMode";
import {
  useLazyLikePostQuery,
} from "../../../../redux/api/services";
import CommentButton from "./CommentButton";

export default function EngagementsFullScreen({
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
  const [likeAmount, setLikeAmount] = useState(() => like);
  const [clicked, setClicked] = useState(() => isLiked);
  const [clickedComment, setClickedComment] = useState(false);
  const [likePost] = useLazyLikePostQuery();
  const shareColor = isDark ? "#91EC09" : "#639E0B";
  const inputRef = useRef(null);
  const handleClicked = (click: boolean) => {
    setClicked(click);
    likePost({ id });
    if (!clicked) {
      setLikeAmount(likeAmount + 1);
    } else {
      setLikeAmount(likeAmount - 1);
    }
  };
  const handleClickComment = () => {
    setClickedComment(!clickedComment);
    // inputRef.current.focus();
  };

  const color = isDark ? "white" : "black";
  return (
    <View style={{}}>
      {title && <Text>{title}</Text>}
      <View></View>
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 20,

          alignItems: "center",

          gap: 6,
          justifyContent: "space-between",
        }}
      >
        <LikeButton
          isLiked={isLiked}
          clicked={clicked}
          setClicked={handleClicked}
        />
        <CommentButton
          setClicked={handleClickComment}
          clicked={clickedComment}
        />
      </View>
    </View>
  );
}
