import {
  View,
  Pressable,
  Dimensions,
  Keyboard,
} from "react-native";
import AnimatedScreen from "../../../components/global/AnimatedScreen";
import { CloseCircleIcon } from "../../../components/icons";
import PostButton from "../../../components/postContent/PostButton";
import useGetMode from "../../../hooks/GetMode";
import TextArea from "../../../components/postContent/TextArea";
import { PostContentProp } from "../../../types/navigation";
import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import Lottie from "lottie-react-native";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hooks";
import {
  usePostContentMutation,
} from "../../../redux/api/services";
import { openToast } from "../../../redux/slice/toast/index";
import {
  closeLoadingModal,
  openLoadingModal,
} from "../../../redux/slice/modal/loading";
import ChooseImage from "@/app/components/postContent/ChooseImage";
import DisplayImage from "@/app/components/postContent/DisplayImage";

const width = Dimensions.get("window").width;
export default function PostContent({ navigation }: PostContentProp) {
  const dark = useGetMode();
  const dispatch = useAppDispatch();
  const [postPhoto, setPostPhoto] = useState<{
    mimeType: string ;
    uri: string;
    size: number;
  } | null>(null);

  const backgroundColor = dark ? "white" : "black";
  const animationRef = useRef<Lottie>(null);
  const [postText, setPostText] = useState<string | undefined>(undefined);
  const [done, setDone] = useState(true);
  useEffect(() => {
    return () => {
      animationRef.current?.pause;
    };
  }, []);
  const [photoServer, setPhotoServer] = useState<{ uri: string; width: number; height: number } | undefined>(undefined);
  const [postContent] = usePostContentMutation();
  const handlePostText = (text: string) => {
    setPostText(text);
  };
  // Xác nhận đăng Post
  const handlePostContent = () => {
    Keyboard.dismiss();
    if (postPhoto?.mimeType.startsWith("image/")) {
      if (photoServer) {
        dispatch(openLoadingModal());
        postContent({
          photo: {
            uri: photoServer.uri,
            height: photoServer.height,
            width: photoServer.width,
          },
          postText,
        })
          .then((e) => {
            dispatch(
              openToast({ text: "Successfully posted", type: "Success" })
            );
            navigation.pop();
            dispatch(closeLoadingModal());
          })
          .catch((e) => {
            dispatch(openToast({ text: "Post failed ", type: "Failed" }));
            dispatch(closeLoadingModal());
          });
      } else {
        dispatch(
          openToast({
            text: "Image didnot upload due to server error",
            type: "Failed",
          })
        );
      }
    }
    if (postText && !postPhoto) {
      dispatch(openLoadingModal());
      postContent({ postText })
        .then((e) => {
          dispatch(openToast({ text: "Successfully posted", type: "Success" }));
          navigation.pop();
          dispatch(closeLoadingModal());
        })
        .catch((e) => {
          dispatch(openToast({ text: "Post failed ", type: "Failed" }));
          dispatch(closeLoadingModal());
        });
    }
  };

  return (
    <AnimatedScreen>
      <View style={{ flex: 1, padding: 20, marginTop: 30 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View
            style={{
              height: 30,
              width: 30,
              borderRadius: 9999,
              overflow: "hidden",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Pressable
              onPress={() => {
                navigation.pop();
              }}
              style={{
                flex: 1,
                borderRadius: 9999,
                justifyContent: "center",
                alignItems: "center",
              }}
              android_ripple={{ color: backgroundColor, foreground: true }}
            >
              <CloseCircleIcon size={30} color={backgroundColor} />
            </Pressable>
          </View>
          {postPhoto ? (
            <PostButton
              isDisabled={!done}
              isLoading={!done}
              onPress={handlePostContent}
            />
          ) : (
            <PostButton
              isDisabled={!postText}
              isLoading={!postText}
              onPress={handlePostContent}
            />
          )}
        </View>
        <TextArea handlePostText={handlePostText} />
        <DisplayImage
        postPhoto={postPhoto}
        setPostPhoto={setPostPhoto}
        done={done}
        />
        <ChooseImage
          postPhoto={postPhoto}
          setPostPhoto={setPostPhoto}
          done={done}
          setDone={setDone}
          photoServer={photoServer}
          setPhotoServer={setPhotoServer}
        />
      </View>
    </AnimatedScreen>
  );
}
