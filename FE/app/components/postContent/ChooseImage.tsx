import { View, Image, Pressable, Platform, PermissionsAndroid, FlatList, Dimensions } from "react-native";
import React, { SetStateAction, useEffect, useState } from "react";
import useGetMode from "../../hooks/GetMode";
import {
    CameraRoll,
    PhotoIdentifier,
} from "@react-native-camera-roll/camera-roll";
import Animated, { FadeInDown, FadeOutDown } from "react-native-reanimated";
import PickImageButton from "./PickImageButton";
import { usePostContentMutation, useUploadPhotoMutation } from "@/app/redux/api/services";
import { useAppDispatch } from "@/app/redux/hooks/hooks";
import { openToast } from "@/app/redux/slice/toast";

const width = Dimensions.get("window").width;
export default function ChooseImage({
    postPhoto,
    setPostPhoto,
    done,
    setDone,
    photoServer,
    setPhotoServer,
}: {
    postPhoto: { mimeType: string, uri: string, size: number } | null,
    setPostPhoto: React.Dispatch<SetStateAction<{ mimeType: string, uri: string, size: number } | null>>,
    done: boolean,
    setDone: React.Dispatch<SetStateAction<boolean>>,
    photoServer: { uri: string; width: number; height: number } | undefined,
    setPhotoServer: React.Dispatch<SetStateAction<{ uri: string; width: number; height: number } | undefined>>,
}) {
    const dark = useGetMode();
    const [photos, setPhotos] = useState<PhotoIdentifier[]>([]);
    const dispatch = useAppDispatch();
    // Chọn ảnh
    function handleSetPhotoPost(mimeType: string, uri: string, size: number) {
        setPostPhoto({
            mimeType,
            uri,
            size,
        });
    }

    //Cấp quyền truy cập vào thư viện ảnh trên Android
    async function hasAndroidPermission() {
        const getCheckPermissionPromise = () => {
            if (Number(Platform.Version) >= 33) {
                return Promise.all([
                    PermissionsAndroid.check(
                        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
                    ),
                ]).then(
                    ([hasReadMediaImagesPermission]) => hasReadMediaImagesPermission
                );
            } else {
                return PermissionsAndroid.check(
                    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
                );
            }
        };

        const hasPermission = await getCheckPermissionPromise();
        if (hasPermission) {
            return true;
        }
        const getRequestPermissionPromise = () => {
            if (Number(Platform.Version) >= 33) {
                return PermissionsAndroid.requestMultiple([
                    PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
                ]).then(
                    (statuses) =>
                        statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES] ===
                        PermissionsAndroid.RESULTS.GRANTED
                );
            } else {
                return PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
                ).then((status) => status === PermissionsAndroid.RESULTS.GRANTED);
            }
        };

        return await getRequestPermissionPromise();
    }
    // Lấy 20 ảnh từ thư viện ảnh trong máy
    useEffect(() => {
        async function getPicture() {
            if (Platform.OS === "android" && !(await hasAndroidPermission())) {
                return;
            }

            CameraRoll.getPhotos({
                first: 20,

                assetType: "Photos",
            })
                .then((r) => {
                    setPhotos(r.edges);
                })
                .catch((err) => {
                    //Error Loading Images
                });
        }
        getPicture();
    }, []);
    const [photo] = useUploadPhotoMutation();
    // Lưu ảnh được chọn lên server
    useEffect(() => {
        if (postPhoto?.mimeType.startsWith("image/")) {
            setDone(false);
            photo(postPhoto)
                .unwrap()
                .then((r) => {
                    setDone(true);
                    setPhotoServer(r.photo);
                })
                .catch((e) => {
                    setDone(true);
                    dispatch(openToast({ text: "Photo didn't upload", type: "Failed" }));
                });
        }
    }, [postPhoto]);
    if (!postPhoto) {
        return (
            <Animated.View
                entering={FadeInDown.springify()}
                exiting={FadeOutDown.springify()}
                style={{
                    position: "absolute",
                    bottom: 0,
                    flexDirection: "row",
                    gap: 10,
                    width,
                    marginBottom: 20,
                }}
            >
                <FlatList
                    horizontal
                    ListHeaderComponent={
                        <View style={{ flexDirection: "row", gap: 10 }}>
                            <PickImageButton handleSetPhotoPost={handleSetPhotoPost} />
                        </View>
                    }
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ gap: 10, paddingLeft: 10 }}
                    data={photos}
                    renderItem={({ item }) => {
                        return (
                            <View
                                style={{
                                    height: 100,
                                    width: 100,
                                    borderRadius: 10,
                                    overflow: "hidden",
                                }}
                            >
                                <Pressable
                                    android_ripple={{ color: "#FFFFFF", foreground: true }}
                                    style={{ borderRadius: 10 }}
                                    onPress={() => {
                                        setPostPhoto({
                                            uri: item?.node?.image?.uri,
                                            mimeType: item?.node?.type,
                                            size: item?.node?.image?.fileSize || 0,
                                        });
                                    }}
                                >
                                    <Image
                                        style={{ height: 100, width: 100, borderRadius: 10 }}
                                        source={{ uri: item?.node?.image?.uri }}
                                    />
                                </Pressable>
                            </View>
                        );
                    }}
                />
            </Animated.View>
        );
    }
}

