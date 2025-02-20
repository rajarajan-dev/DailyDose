import { View, Text, FlatList } from "react-native";
import React from "react";
import { prescription } from "../types/prescription";
import TodayDrugCard from "./TodayDrugCard";
import DisplayDrugCard from "./DisplayDrugCard";

interface PrescriptionListProps {
  data: prescription[];
  handleTaken: (item: prescription) => void;
  handleNotTaken: (item: prescription) => void;
  cardType: "today" | "display";
}
const PrescriptionList: React.FC<PrescriptionListProps> = ({
  data,
  handleTaken,
  handleNotTaken,
  cardType,
}) => {
  const renderTodayDrugCardItem = ({ item }: { item: prescription }) => (
    <TodayDrugCard
      name={item.name}
      description={item.description}
      timing={"Morning, Lunch, Evening, Night"}
      taken={item.taken}
      handleTaken={() => handleTaken(item)}
      handleNotTaken={() => handleNotTaken(item)}
    />
  );

  const renderDisplayDrugCardItem = ({ item }: { item: prescription }) => (
    <DisplayDrugCard
      name={item.name}
      description={item.description}
      timing={"Morning, Lunch, Evening, Night"}
      taken={item.taken}
      startDate={item.startDate}
      endDate={item.endDate}
      doctor={item.doctor}
    />
  );

  return (
    <FlatList
      data={data}
      renderItem={
        cardType == "today"
          ? renderTodayDrugCardItem
          : renderDisplayDrugCardItem
      }
      keyExtractor={(item) => item.id}
    />
  );
};

export default PrescriptionList;
