import { View, Text, FlatList } from "react-native";
import React from "react";
import { prescription } from "../types/prescription";
import TodayDrugCard from "./TodayDrugCard";

interface prescriptionListProps {
  data: prescription[];
  handleTaken: (item: prescription) => void;
  handleNotTaken: (item: prescription) => void;
}
const prescriptionList: React.FC<prescriptionListProps> = ({
  data,
  handleTaken,
  handleNotTaken,
}) => {
  const renderItem = ({ item }: { item: prescription }) => (
    <TodayDrugCard
      name={item.name}
      description={item.description}
      timing={"Morning, Lunch, Evening, Night"}
      taken={item.taken}
      startDate={item.startDate}
      endDate={item.endDate}
      doctor={item.doctor}
      handleTaken={() => handleTaken(item)}
      handleNotTaken={() => handleNotTaken(item)}
    />
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
};

export default prescriptionList;
