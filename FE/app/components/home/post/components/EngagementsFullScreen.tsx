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
  useLazyRepostQuery,
} from "../../../../redux/api/services";
import CommentButton from "./CommentButton";
import RepostButton from "./RepostButton";

export default function EngagementsFullScreen({
  title,
  like,
  comments,
  isLiked,
  id,
  isReposted,
  handleShare,
}: {
  title?: string;
  like: number;
  comments?: number;
  id: string;
  isLiked: boolean;
  isReposted: boolean;
  handleShare: () => void;
}) {
  const dark = useGetMode();
  const isDark = dark;
  const [reposted, setRepost] = useState(() => isReposted);
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
        <Pressable onPress={handleShare}>
          <ShareUnfocused size={20} color={shareColor} />
        </Pressable>
      </View>
    </View>
  );
}
