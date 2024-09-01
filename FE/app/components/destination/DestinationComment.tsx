import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  Button,
  Keyboard,
  Pressable,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import CommentBuilder from "../home/post/comment/CommentBuilder";
import CommentButton from "../home/post/components/CommentButton";
import useGetMode from "../../hooks/GetMode";
import { useAppSelector } from "../../redux/hooks/hooks";
import { SendIcon } from "../icons";
import { useLazyAllCommentDestinationQuery, useCommentDestinationMutation } from "@/app/redux/api/destination";
import { IComment } from "@/app/types/api";

const DestinationComment = ({idDestination}: {idDestination: string}) => {
  const route = useRoute();
  const [comments, setComments] = useState<IComment[]>([]);
  const [commentText, setCommentText] = useState("");
  const [postComment] = useCommentDestinationMutation();
  const [allComments,allCommentsResponse] = useLazyAllCommentDestinationQuery();
  const dark = useGetMode();
  const color = dark ? "white" : "black";
   // Trigger fetch when destinationId changes
   useEffect(() => {
    allComments(idDestination)
    .unwrap()
        .then((r) => {
          setComments(r.allCommentDestination);
        })
        .catch((e) => {
        });
   },[commentText])
  const handleCommentPost = async () => {
    postComment({comment: commentText, idDestination: idDestination})
    .unwrap()
    .then((e) => {
      console.log("Post Comment seccessed");
      setCommentText("");
    })
  };

  return (
    <View
      style={{
        flex: 1,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
      }}
    >
      <Text
        style={{
          paddingBottom: 10,
          fontFamily: "jakaraBold",
          color: dark ? "white" : "black",
        }}
      >
        Bình luận
      </Text>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          overflow: "hidden",
          borderRadius: 15,
          minHeight: 55,
          borderWidth: 0.5,
          borderColor: "#B4B4B488",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TextInput
          placeholder="Post comment..."
          value={commentText || ""}
          onChangeText={setCommentText}
          placeholderTextColor={"grey"}
          style={{
            fontFamily: "jakara",

            paddingLeft: 20,
            width: "80%",
            includeFontPadding: false,
            fontSize: 15,
          }}
        />
        <View style={{ paddingHorizontal: 20 }}>
          <View
            style={{
              height: 40,
              width: 40,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 29,
            }}
          >
            <Pressable
              onPress={handleCommentPost}
              style={{
                height: 40,
                width: 40,
                overflow: "hidden",
                borderRadius: 999,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <SendIcon size={25} color={color} />
            </Pressable>
          </View>
        </View>
      </View>
      <FlatList
        data={comments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CommentBuilder
            imageUri={item.User ? item.User.imageUri : ""}
            name={item.User?.name}
            comment={item.comment}
            date={item.createdAt}
            userTag={item.User?.userName} // Add null check for userTag
            verified={item.User?.verified}
            photoUri={[]}
            id={item.User?.id} // Add null check for id
          />
        )}
      />
    </View>
  );
};

export default DestinationComment;
