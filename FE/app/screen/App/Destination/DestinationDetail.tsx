import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  Pressable,
} from "react-native";
import useGetMode from "../../../hooks/GetMode";
import { ViewDestinationDetail } from "../../../types/navigation";
import { IComment } from "@/app/types/api";
import { useCommentDestinationMutation, useLazyAllCommentDestinationQuery } from "@/app/redux/api/destination";
import { SendIcon } from "@/app/components/icons";
import CommentBuilder from "@/app/components/home/post/comment/CommentBuilder";
import DestinationInformation from "@/app/components/destination/DestinationInformation";
import { useAppSelector } from "@/app/redux/hooks/hooks";
import { Skeleton } from "@/app/components/home/misc/Skeleton";

const DestinationDetail = ({ navigation, route }: ViewDestinationDetail) => {
  const destinationId = route.params.destinationId;
  const [comments, setComments] = useState<IComment[]>([]);
  const [commentText, setCommentText] = useState("");
  const [postComment] = useCommentDestinationMutation();
  const [allComments] = useLazyAllCommentDestinationQuery();
  const dark = useGetMode();
  const color = dark ? "white" : "black";
  // Trigger fetch when destinationId changes
  useEffect(() => {
    allComments(destinationId)
      .unwrap()
      .then((r) => {
        setComments(r.allCommentDestination);
      })
      .catch((e) => {
      });
  }, [commentText])
  const handleCommentPost = async () => {
    postComment({ comment: commentText, idDestination: destinationId })
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
      }}
    >
      <FlatList
        ListHeaderComponent={
            <>
            <DestinationInformation destinationId={destinationId} />
              <Text
                style={{
                  padding: 10,
                  fontFamily: "jakaraBold",
                  color: dark ? "white" : "black",
                }}
              >
                Bình luận
              </Text>
              <View
                style={{
                  margin: 10,
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
                  }} />
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
              </> 
        }
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
        nestedScrollEnabled={true}
      />
    </View>
  );
};

export default DestinationDetail;
