import {
  View,
  Text,
  FlatList,
  TextInput,
  ActivityIndicator,
  Pressable,
  Keyboard,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ViewPost } from "../../../types/navigation";
import FullScreenPost from "../../../components/home/post/FullScreenPost";
import {
  useLazyGetCommentByPostQuery,
  useLazyGetSinglePostQuery,
  usePostCommentMutation,
} from "../../../redux/api/services";
import { IComment } from "../../../types/api";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hooks";
import { openToast } from "../../../redux/slice/toast/index";
import CommentBuilder from "../../../components/home/post/comment/CommentBuilder";
import useGetMode from "../../../hooks/GetMode";
import uuid from "react-native-uuid";
import { BlurView } from "expo-blur";
import Animated, { FadeIn } from "react-native-reanimated";
import { SendIcon } from "../../../components/icons";

export default function PostScreen({ navigation, route }: ViewPost) {
  const { params } = route;
  const dispatch = useAppDispatch();
  const [comments, setComments] = useState<IComment[]>([]);
  const [commentText, setCommentText] = useState<string | null>(null);
  const user = useAppSelector((state) => state.user.data);
  const [postComment, postCommentResponse] = usePostCommentMutation();

  const dark = useGetMode();
  const color = dark ? "white" : "black";
  const backgroundColor = !dark ? "white" : "black";
  const [getComments, commentResponse] = useLazyGetCommentByPostQuery();
  const [getSinglePost, singlePostResponse] = useLazyGetSinglePostQuery();
  useEffect(() => {
    if (params.id) {
      getComments({ id: params.id })
        .unwrap()
        .then((r) => {
          setComments(r.comment);
        })
        .catch((e) => {
          dispatch(
            openToast({ text: "Failed to get Comments", type: "Failed" })
          );
        });
    } else {
      if (singlePostResponse.data?.posts)
        getComments({ id: singlePostResponse.data?.posts.id })
          .unwrap()
          .then((r) => {
            setComments(r.comment);
          })
          .catch((e) => {
            dispatch(
              openToast({ text: "Failed to get Comments", type: "Failed" })
            );
          });
    }
  }, [params?.id]);

  useEffect(() => {
    if (!params?.id) {
      getSinglePost({ id: params?.postId as string }).then((e) => {
        console.log(e);
      });
    }
  }, [params?.id]);

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const handleCommentPost = () => {
    Keyboard.dismiss();
    setCommentText("");
    if (commentText) {
      setComments((prev) => [
        {
          id: uuid.v4().toString(),
          User: {
            id: "0",
            imageUri: user?.imageUri || "",
            verified: false,
            userName: user?.userName as string,
            name: user?.name as string,
          },
          comment: commentText,
          createdAt: `${new Date()}`,
        },
        ...prev,
      ]);
      postComment({ id: params.id, comment: commentText });
    }
  };
  const tint = dark ? "dark" : "light";
  return (
    <Animated.View
      entering={FadeIn.duration(400)}
      style={{ flex: 1, marginTop: 85 }}
    >
      <FlatList
        style={{ marginBottom: 64 }}
        ListHeaderComponent={
            <FullScreenPost {...params} />
        }
        data={comments}
        ListEmptyComponent={
          <View style={{ marginTop: 20 }}>
            {commentResponse.isLoading && (
              <ActivityIndicator size={20} color={color} />
            )}
          </View>
        }
        renderItem={({ item }) => (
          <CommentBuilder
            imageUri={item.User?.imageUri}
            name={item.User?.name}
            comment={item.comment}
            date={item.createdAt}
            userTag={item.User.userName}
            verified={item.User.verified}
            photoUri={[]}
            id={item.User.id}
          />
        )}
      />
      <View
        style={{
          position: "absolute",
          bottom: 2,
          zIndex: 999,
          width: "97%",
          backgroundColor,
          borderRadius: 15,
          left: 6,
          borderWidth: 0.9,
          borderColor: "#B4B4B488",
          paddingBottom: 10,
          paddingHorizontal: 25,
        }}
      >
        <BlurView
          intensity={200}
          tint={tint}
          style={{
            position: "absolute",
            width: "150%",
            height: "150%",
            opacity: 0.1,
          }}
        />
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TextInput
            placeholder="Post comment..."
            value={commentText || ""}
            onChangeText={setCommentText}
            placeholderTextColor="grey"
            style={{
              paddingTop: 8,
              fontFamily: "jakara",
              height: 50,
              color,
              width: "92%", // Adjust width as needed
              includeFontPadding: false,
              fontSize: 16,
            }}
          />
          <Pressable
            onPress={handleCommentPost}
            style={{
              paddingTop: 10,
              height: 40,
              width: 40,
              overflow: "hidden",
              borderRadius: 999,
              justifyContent: "center",
              alignItems: "center",
              marginLeft: 0, // Adjust margin as needed for spacing
            }}
          >
            <SendIcon size={25} color={color} />
          </Pressable>
        </View>
      </View>
    </Animated.View>
  );
}
