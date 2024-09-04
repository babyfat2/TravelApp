import { View, Dimensions, Pressable, Text } from "react-native";

import ProfileImage from "./components/ProfileImage";
import TextPost from "./components/TextPost";
import useGetMode from "../../../hooks/GetMode";
import { IPostBuilder } from "../../../types/app";
import { ProfileIcon } from "../../icons";
import { useNavigation } from "@react-navigation/native";
import { HomeNavigationProp } from "../../../types/navigation";
import EngagementsFullScreen from "./components/EngagementsFullScreen";
import NameAndTagFullScreen from "./components/NameAndTagFullScreen";
import PhotoPostFullScreen from "./components/PhotoPostFullScreen";
import { dateFormatted } from "../../../util/date";
import EngagementsText from "./misc/EngagementText";
import { useAppSelector } from "../../../redux/hooks/hooks";
import LinkPost from "./components/LinkPost";
import Share from "react-native-share";
import ViewShot from "react-native-view-shot";
import { useRef } from "react";
export default function FullScreenPost({
  imageUri,
  name,
  isLiked,
  userTag,
  photoUri,
  verified,
  postText,
  comments,
  date,
  userId,
  title,
  like,
  photo,
  link,
  id,
}: IPostBuilder) {
  const width = Dimensions.get("window").width;
  const navigation = useNavigation<HomeNavigationProp>();
  const dark = useGetMode();
  const isDark = dark;
  const backgroundColor = isDark ? "black" : "white";
  const borderBottomColor = isDark ? "#252222" : "#CCC9C9";
  const color = isDark ? "#FFFFFF" : "#000000";
  const rColor = isDark ? "#FFFFFF2A" : "#0000001B";
  const user = useAppSelector((state) => state.user.data);
  const [dateString, timeString] = dateFormatted(new Date(date)).split(",");

  const ref = useRef<any>(null);

  return (
    <ViewShot
      ref={ref}
      options={{ fileName: `${id}`, format: "jpg", quality: 0.9 }}
    >
      <View
        style={{
          backgroundColor,
          borderBottomWidth: 0.5,
          borderBottomColor,
          padding: 10,
        }}
      >
        <View
          style={{
            width: "100%",
            gap: 10,
          }}
        >
          <View style={{ flexDirection: "row", gap: 10 }}>
            <View
              style={{
                height: 50,
                width: 50,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 9999,
                overflow: "hidden",
              }}
            >
              <Pressable
                onPress={() => {
                  userId && userId !== user?.id
                    ? navigation.navigate("ProfilePeople", {
                        id: userId,
                        imageUri,
                        userTag,
                        verified,
                        name,
                      })
                    : userId && userId === user?.id
                    ? navigation.navigate("Profile")
                    : null;
                }}
                android_ripple={{ color: rColor, foreground: true }}
                style={{
                  height: 50,
                  width: 50,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {imageUri ? (
                  <ProfileImage imageUri={imageUri} />
                ) : (
                  <ProfileIcon color={color} size={58} />
                )}
              </Pressable>
            </View>
            <NameAndTagFullScreen
              name={name}
              verified={verified}
              userTag={userTag}
            />
          </View>
          <View style={{ width: "100%", justifyContent: "flex-start" }}>
            {postText &&
              (!link ? (
                <TextPost postText={postText} photoUri={photoUri} />
              ) : (
                <LinkPost
                  id={link.id}
                  photoUri={[link.imageUri || ""]}
                  title={link.title}
                  url={postText}
                />
              ))}
            <View>
              {photo && (
                <PhotoPostFullScreen
                  id={id}
                  photoUri={photo?.uri}
                  height={photo?.height}
                  width={photo?.width}
                />
              )}
            </View>

            <View
              style={{ flexDirection: "row", gap: 4, alignItems: "center" }}
            >
              <Text
                style={{
                  color: "#7a868f",
                  fontFamily: "mulishMedium",
                  fontSize: 16,
                }}
              >
                {timeString}
              </Text>
              <View
                style={{
                  width: 3,
                  height: 3,
                  backgroundColor: "#7a868f",
                  borderRadius: 999,
                }}
              />
              <Text
                style={{
                  color: "#7a868f",
                  fontFamily: "mulishMedium",
                  fontSize: 14,
                }}
              >
                {dateString}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                gap: 5,
                marginVertical: 10,
                paddingVertical: 10,
                borderTopColor: "#7a868f",
                borderTopWidth: 0.3,
                borderBottomWidth: 0.3,
                borderBottomColor: "#7a868f",
              }}
            >
              <EngagementsText engagementNumber={like} engage="Like" />
              <EngagementsText
                engagementNumber={comments || 0}
                engage="Comment"
              />
            </View>
            <EngagementsFullScreen
              title={title}
              comments={comments}
              like={like}
              isLiked={isLiked}
              id={id}
            />
          </View>
        </View>
      </View>
    </ViewShot>
  );
}
