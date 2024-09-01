import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { NavigationProp } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { IPostBuilder } from "./app";

export type RootStackParamList = {
  Main: undefined;
  ImageFullScreen: {
    photoUri: string;
    id?: string;
    height?: number;
    width?: number;
  };
  FollowingFollowers: {
    initial: "Following" | "Followers";
  };
  ViewPost: IPostBuilder;
  Profile: undefined;
  ProfilePeople: {
    id: string;
    imageUri: string;
    userTag: string;
    name: string;
    verified: boolean;
  };
  ChatScreen: {
    id: string;
    chatId?: string;
    name: string;
    imageUri: string;
    receiverId: string;
  };
  SearchUser: undefined;
  PostContent: undefined;
  EditProfile: undefined;
  DestinationFavorite: undefined;
  Destination: undefined;
  DestinationDetail: { destinationId: string };
  DestinationComment: { destinationId: string };
  ImageItem: undefined;
  ChangeData: {
    change: "userName" | "password" | "name";
  };
};

export type BottomRootStackParamList = {
  BottomHome: undefined;
  Destination: undefined;
  Messages: undefined;
  Discover: undefined;
  Notifications: undefined;
};

export type DrawerRootStackParamList = {
  Home: undefined;
};

export type AuthRootStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type HomeNavigationProp = NavigationProp<RootStackParamList, "Main">;
export type PeopleProfileNavigationProp = NavigationProp<
  RootStackParamList,
  "ProfilePeople"
>;
export type ImageFullScreenProp = NativeStackScreenProps<
  RootStackParamList,
  "ImageFullScreen"
>;
export type PostContentProp = NativeStackScreenProps<
  RootStackParamList,
  "PostContent"
>;
export type ProfilePeopleProp = NativeStackScreenProps<
  RootStackParamList,
  "ProfilePeople"
>;
export type ChatScreenProp = NativeStackScreenProps<
  RootStackParamList,
  "ChatScreen"
>;
export type EditProfileProp = NativeStackScreenProps<
  RootStackParamList,
  "EditProfile"
>;

export type ChangeDataProp = NativeStackScreenProps<
  RootStackParamList,
  "ChangeData"
>;
export type SearchUserProp = NativeStackScreenProps<
  RootStackParamList,
  "SearchUser"
>;
export type DestinationDetailProp = NativeStackScreenProps<
  RootStackParamList,
  "DestinationDetail"
>;
export type DestinationFavoriteProp = NativeStackScreenProps<
  RootStackParamList,
  "DestinationFavorite"
>;

export type ImageItemProp = {
  name: any;
  id: string;
  location: string;
  src: any; // Consider using a more specific type, like ImageSourcePropType from 'react-native'
  title: string;
  image: string[];
};

export type SearchUserNavigation = NavigationProp<
  RootStackParamList,
  "SearchUser"
>;
export type ChatNavigation = NavigationProp<RootStackParamList, "ChatScreen">;
export type ChangeDataNavigationProp = NavigationProp<
  RootStackParamList,
  "ChatScreen"
>;
export type HomeProp = NativeStackScreenProps<RootStackParamList, "Main">;
export type DrawerHomeProp = DrawerScreenProps<
  DrawerRootStackParamList,
  "Home"
>;

export type BottomProp = BottomTabScreenProps<
  BottomRootStackParamList,
  "BottomHome"
>;

export type DiscoverProp = BottomTabScreenProps<
  BottomRootStackParamList,
  "Discover"
>;
export type DestinationProp = BottomTabScreenProps<
  BottomRootStackParamList,
  "Destination"
>;
export type ViewPost = NativeStackScreenProps<RootStackParamList, "ViewPost">;

export type LoginScreen = NativeStackScreenProps<
  AuthRootStackParamList,
  "Login"
>;
export type RegisterScreen = NativeStackScreenProps<
  AuthRootStackParamList,
  "Register"
>;
export type DestinationNavigationProp = NativeStackScreenProps<RootStackParamList, "Destination">;
export type ViewDestinationDetail = NativeStackScreenProps<RootStackParamList, "DestinationDetail">;