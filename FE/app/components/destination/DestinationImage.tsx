import React from "react";
import { View, ScrollView,Image, StyleSheet, Dimensions, Pressable } from "react-native";
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { Photo } from "@/app/types/api";
import { ViewDestinationDetail, DestinationNavigationProp, HomeNavigationProp } from "@/app/types/navigation";
import { useNavigation } from "@react-navigation/native";
const height = Dimensions.get("window").height / 4;
const width = Dimensions.get("window").width;

const DestinationImage = ({ images }: { images: Photo[]}) => {
  const navigation = useNavigation<HomeNavigationProp>();
  return (
    <View style={styles.container}>
      <SwiperFlatList
      autoplay
      autoplayDelay={3}
      autoplayLoop
      index={0}
      showPagination
      data={images}
      renderItem={({ item }) => (
        <Pressable
        android_ripple={{ color: "#000000", foreground: true }}
        onPress={() => {
          navigation.navigate("ImageFullScreen", {
            photoUri: item.imageUri,
            id: item.id,
            height: item.height,
            width: item.width,
          });
        }}
        >
        <Image style={{height: height, width: width}} source={{ uri: item.imageUri }} />
        </Pressable>
      )}
    />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 0,
  },
});

export default DestinationImage;
