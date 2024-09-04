import React, { useEffect, useState } from "react";
import { View, ScrollView, LogBox } from "react-native";

import { useLazyGetSingleDestinationQuery } from "@/app/redux/api/destination";
import Animated, { FadeIn } from "react-native-reanimated";
import { IDestination } from "@/app/types/api";
import DestinationImage from "./DestinationImage";
import DestinationDescription from "./DestinationDescription";
import { useAppSelector } from "@/app/redux/hooks/hooks";
import { SkeletonDestination } from "./SkeletonDestination";

const DestinationInformation = ({destinationId}: {destinationId: string}) =>{
  const [isLiked, setIsLiked] = useState(false);
  const [destinationData, setDestinationData] = useState<IDestination>();
  const destinations = useAppSelector((state) => state.destination)
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
  
  },[]);
  console.log(destinations.loading);
  return (
    <Animated.View
      entering={FadeIn.duration(400)}
      style={{ flex: 1, marginTop: 40 }}>
        {!destinations.loading ? (
          <SkeletonDestination />
      ) : destinationData && (
        <View style={{ flex: 1 }}>
          <ScrollView 
          style={{ flex: 1, marginBottom: 10 }}
          >
            <DestinationImage images={destinationData.images} />
            <DestinationDescription
              idDestination={destinationId}
              name={destinationData.name}
              description={destinationData.description}
              location={destinationData.location}
              clicked={isLiked}
              setClicked={setIsLiked}
            />
          </ScrollView>
        </View>
      )}
    </Animated.View>
  );
};

export default DestinationInformation;
