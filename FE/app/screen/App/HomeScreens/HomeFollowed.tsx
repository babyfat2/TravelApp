import {
  View,
  Dimensions,
  RefreshControl,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import Fab from "../../../components/home/post/components/Fab";
import { AddIcon, } from "../../../components/icons";
import PostBuilder from "../../../components/home/post/PostBuilder";
import { FlashList } from "@shopify/flash-list";
import AnimatedScreen from "../../../components/global/AnimatedScreen";
import useGetMode from "../../../hooks/GetMode";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hooks";
import { ActivityIndicator } from "react-native-paper";
import { IPost } from "../../../types/api";
import { useLazyGetFollowedPostsQuery } from "../../../redux/api/services";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeOut,
  FadeOutDown,
} from "react-native-reanimated";
import SkeletonGroupPost from "../../../components/home/misc/SkeletonGroupPost";
import EmptyList from "../../../components/home/misc/EmptyList";
import { resetPost } from "../../../redux/slice/post/followed";
import { resetPost as resetAllPosts } from "../../../redux/slice/post";
import Robot from "../../../components/home/post/misc/Robot";

export default function HomeFollowed() {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  const dark = useGetMode();
  const dispatch = useAppDispatch();
  const posts = useAppSelector((state) => state.followedPost);
  const isDark = dark;
  const color = isDark ? "white" : "black";
  const backgroundColor = !isDark ? "white" : "black";
  const height = Dimensions.get("window").height;
  const width = Dimensions.get("window").width;

  const [skip, setSkip] = useState(0);
  const authId = useAppSelector((state) => state.user.data?.id);
  const [noMore, setNoMore] = useState(false);

  useEffect(() => {
    dispatch(resetAllPosts());
  }, []);
  const [getLazyPost, postRes] = useLazyGetFollowedPostsQuery();
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = useCallback(() => {
    dispatch(resetPost());
    setSkip(0);
    setNoMore(false);
    setRefreshing(false),
      getLazyPost({ take: 20, skip })
        .unwrap()
        .then((e) => {
          setSkip(skip + e.posts.length);

          if (e.posts.length === 0) {
            setNoMore(true);
          }
        })
        .catch((e) => {
          // dispatch(
          //   openToast({ text: "couldn't get recent posts", type: "Failed" })
          // );
        });
  }, []);

  const renderFooter = () => {
    if (noMore) {
      return (
        <View
          style={{
            width: "100%",
            marginTop: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Robot />
        </View>
      );
    } else if (posts.loading) {
      return (
        <Animated.View
          exiting={FadeOut.duration(50)}
          entering={FadeIn.duration(50)}
          style={{
            marginTop: 20,
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator color={color} size={20} />
        </Animated.View>
      );
    }
  };

  useEffect(() => {
    getLazyPost({ take: 20, skip })
      .unwrap()
      .then((e) => {
        setSkip(e.posts?.length);
      })
      .catch((e) => {
      });
  }, []);

  const fetchMoreData = () => {
    if (!noMore)
      getLazyPost({ take: 20, skip })
        .unwrap()
        .then((e) => {
          setSkip(skip + e.posts.length);

          if (e.posts.length === 0) {
            setNoMore(true);
          }
        })
        .catch((e) => {
          // dispatch(
          //   openToast({ text: "couldn't get recent posts", type: "Failed" })
          // );
        });
  };
  const handleRefetch = () => {
    setSkip(0);
    setNoMore(false);
    getLazyPost({ take: 10, skip: 0 })
      .unwrap()
      .then((r) => {
        setRefreshing(false);
      })
      .catch((e) => {
        setRefreshing(false);
        // dispatch(
        //   openToast({ text: "couldn't get recent posts", type: "Failed" })
        // );
      });
  };

  const renderItem = ({ item }: { item: IPost }) => (
    <PostBuilder
      id={item.id}
      date={item.createdAt}
      link={item.link}
      photo={
        item.photo
          ? {
              uri: item.photo?.imageUri,
              width: item.photo?.imageWidth,
              height: item.photo?.imageHeight,
            }
          : undefined
      }
      comments={item._count.comments}
      like={item._count.like}
      isLiked={
        item?.like?.find((like) => like?.userId === authId) ? true : false
      }
      imageUri={item.user?.imageUri}
      name={item.user?.name}
      thumbNail={item.videoThumbnail}
      userTag={item.user?.userName}
      verified={item.user?.verified}
      photoUri={item.photoUri}
      postText={item.postText}
    />
  );
  const keyExtractor = (item: IPost) => item.id?.toString();
  return (
    <AnimatedScreen>
      {posts.loading && posts.data.length === 0 ? (
        <SkeletonGroupPost />
      ) : posts.data.length === 0 ? (
        <EmptyList handleRefetch={handleRefetch} />
      ) : (
        <Animated.View
          style={{ flex: 1 }}
          entering={FadeInDown.springify().duration(400)}
          exiting={FadeOutDown.springify()}
        >
          <FlashList
            data={posts.data}
            decelerationRate={0.991}
            estimatedItemSize={250}
            ListFooterComponent={renderFooter}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={["red", "blue"]}
              />
            }
            keyExtractor={keyExtractor}
            onEndReachedThreshold={0.3}
            onEndReached={fetchMoreData}
            estimatedListSize={{ width: width, height: height }}
            renderItem={renderItem}
            contentContainerStyle={{ paddingTop: 100, paddingBottom: 100 }}
          />
        </Animated.View>
      )}
      <Fab item={<AddIcon size={30} color={color} />} />
    </AnimatedScreen>
  );
}
