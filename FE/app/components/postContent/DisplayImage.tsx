import { View, Pressable,} from "react-native";
import React, { SetStateAction, useEffect, useState } from "react";
import { Image } from "expo-image";
import { ActivityIndicator } from "react-native-paper";
import { CloseCircleIcon } from "../icons";

// Hiển thị ảnh được chọn
export default function DisplayImage({
    postPhoto,
    setPostPhoto,
    done,
}: {
    postPhoto: { mimeType: string, uri: string, size: number } | null,
    setPostPhoto: React.Dispatch<SetStateAction<{ mimeType: string, uri: string, size: number } | null>>,
    done: boolean,
}) {
    if (postPhoto) {
        return (
            <View>
                <View
                    style={{
                        padding: 20,
                        borderRadius: 9999,
                        overflow: "hidden",
                        justifyContent: "center",
                        alignItems: "flex-end",
                    }}
                >
                    <Pressable
                        onPress={() => {
                            setPostPhoto(null);
                        }}
                        style={{
                            flex: 1,
                            borderRadius: 9999,
                            backgroundColor: "red",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                        android_ripple={{ color: "white", foreground: true }}
                    >
                        <CloseCircleIcon size={30} color={"red"} />
                    </Pressable>
                </View>
                <View
                    style={{
                        height: 200,
                        width: "100%",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    {!done ? (
                        <View
                            key={"portal"}
                            style={{
                                position: "absolute",
                                zIndex: 9,
                                left: 0,
                                right: 0,
                                top: 0,
                                justifyContent: "center",
                                alignItems: "center",
                                bottom: 0,
                            }}
                        >
                            {<ActivityIndicator size={40} color="white" />}
                        </View>
                    ) : (
                        <></>
                    )}
                    <Image
                        style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: 20,
                            paddingHorizontal: 20,
                        }}
                        source={{ uri: postPhoto?.uri }}
                        contentFit="contain"
                    />
                </View>
            </View>
        );
    }
}

