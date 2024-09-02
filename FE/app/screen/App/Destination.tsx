import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  Text,
  FlatList,
} from "react-native";
import AnimatedScreen from "../../components/global/AnimatedScreen";
import { DestinationNavigationProp} from "../../types/navigation";
import { useDebounce } from "../../hooks/Debounce";
import { useGetAllDestinationQuery } from "@/app/redux/api/destination";
import { IDestination } from "@/app/types/api";
import DestinationBox from "@/app/components/destination/DestinationBox";
import { useAppSelector } from "@/app/redux/hooks/hooks";

const Destination = ({ navigation }: DestinationNavigationProp) => {
  const [filteredDestinations, setFilteredDestinations] = useState<IDestination[]>([]);
  const [searchParam, setSearchParam] = useState("");
  const {data, error, isLoading} = useGetAllDestinationQuery(null);
  const query = useDebounce(searchParam, 1000);
  useEffect(() => {
    if (data) {
    setFilteredDestinations(data);
    }
  });

  return (
    <AnimatedScreen style={{ paddingTop: 90, paddingBottom: 57 }}>
      <FlatList
        data={filteredDestinations}
        renderItem={(item) => 
          <DestinationBox 
          destination={item.item} 
          onPress={() => { navigation.navigate("DestinationDetail", { destinationId: item.item.id });}} 
          />
        }
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
      />
    </AnimatedScreen>
  );
};

export default Destination;
