import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
} from "react-native";
import AnimatedScreen from "../../../components/global/AnimatedScreen";
import { DestinationFavoriteProp, ImageItemProp } from "../../../types/navigation";
import { useDebounce } from "../../../hooks/Debounce";
import { useAppSelector } from "../../../redux/hooks/hooks";
import { useLazyGetDestinationLikeByUserQuery } from "@/app/redux/api/destination";
import { IDestination } from "@/app/types/api";
import DestinationBox from "@/app/components/destination/DestinationBox";

const DestinationFavorite = ({ navigation }: DestinationFavoriteProp) => {
  // const [destinations, setDestinations] = useState([]);
  const [filteredDestinations, setFilteredDestinations] = useState<IDestination[]>([]);
  const [searchParam, setSearchParam] = useState("");
  const query = useDebounce(searchParam, 1000);
  const user = useAppSelector((state) => state.user.data);
  const [destinationData] = useLazyGetDestinationLikeByUserQuery();

  useEffect(() => {
    destinationData(null)
    .unwrap()
    .then((e) => {
      setFilteredDestinations(e);
    })
  });
  console.log(filteredDestinations)
  return (
    <AnimatedScreen style={{ paddingTop: 90, paddingBottom: 57 }}>
      <Text
        style={{
          fontSize: 20,
          paddingTop: 0,
          paddingBottom: 5,
          fontWeight: "bold",
          paddingLeft: 15,
        }}
      >
        Destinations
      </Text>
      <FlatList
        data={filteredDestinations}
        renderItem={(item) => 
          <DestinationBox 
          destination={item.item} 
          onPress = {() => navigation.navigate("DestinationDetail", { destinationId: item.item.id })} />
        }
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
      />
    </AnimatedScreen>
  );
};

export default DestinationFavorite;
