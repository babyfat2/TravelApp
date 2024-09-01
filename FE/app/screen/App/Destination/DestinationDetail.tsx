import React, { useEffect, useState } from "react";
import { View, ScrollView, LogBox } from "react-native";
import { useRoute } from "@react-navigation/native";
import AnimatedScreen from "../../../components/global/AnimatedScreen";
import DestinationImage from "../../../components/destination/DestinationImage";
import DestinationDescription from "../../../components/destination/DestinationDescription";
import DestinationComment from "../../../components/destination/DestinationComment";
import useGetMode from "../../../hooks/GetMode";
import { useAppSelector } from "../../../redux/hooks/hooks";
import { IDestination } from "@/app/types/api";
import { ViewDestinationDetail } from "../../../types/navigation";
import { useLazyGetSingleDestinationQuery } from "@/app/redux/api/destination";
import Animated, { FadeIn } from "react-native-reanimated";

const DestinationDetail = ({navigation,route}: ViewDestinationDetail ) =>{
  const destinationId = route.params.destinationId;
  const [isLiked, setIsLiked] = useState(false);
  const [destinationData, setDestinationData] = useState<IDestination>();
  const dark = useGetMode();
  const userId = useAppSelector((state) => state.user.data?.id);
  const [singleDestinationData] = useLazyGetSingleDestinationQuery();
  useEffect(() => {
    singleDestinationData(destinationId)
    .unwrap()
    .then((data) => {
      if(data) {
        setDestinationData(data);
        console.log(data.likes);
        if(data.likes.length === 1) {
          setIsLiked(true);
        } else {
          setIsLiked(false);
        }
      }
    })
  
  },[isLiked]);
  return (
    <Animated.View
      entering={FadeIn.duration(400)}
      style={{ flex: 1, marginTop: 40 }}>
      {destinationData && (
        <View style={{ flex: 1 }}>
          <ScrollView style={{ flex: 1, marginBottom: 10 }}>
            <DestinationImage images={destinationData.images} />
            <DestinationDescription
              idDestination={destinationId}
              name={destinationData.name}
              description={destinationData.description}
              location={destinationData.location}
              clicked={isLiked}
              setClicked={setIsLiked}
            />
            <DestinationComment idDestination={destinationId}/>
          </ScrollView>
        </View>
      )}
    </Animated.View>
  );
};

export default DestinationDetail;
