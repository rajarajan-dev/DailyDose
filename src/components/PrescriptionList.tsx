import { FlatList } from "react-native";
import React from "react";
import TodayDrugCard from "./TodayDrugCard";
import DisplayDrugCard from "./DisplayDrugCard";
import { DrugDocumentWithUser } from "../types/DrugDocument";

interface PrescriptionListProps {
  data: DrugDocumentWithUser[] | undefined;
  handleTaken: (item: DrugDocumentWithUser) => void;
  handleNotTaken: (item: DrugDocumentWithUser) => void;
  cardType: "today" | "display";
}
const PrescriptionList: React.FC<PrescriptionListProps> = ({
  data,
  handleTaken,
  handleNotTaken,
  cardType,
}) => {
  const renderTodayDrugCardItem = ({
    item,
  }: {
    item: DrugDocumentWithUser;
  }) => (
    <TodayDrugCard
      name={item.name}
      dosage={item.dosage}
      description={item.description}
      timing={item.timing.join(",")}
      canBeTaken={item.canbetaken}
      startdate={item.startdate}
      enddate={item.enddate}
      doctor={item.doctor}
      handleTaken={() => handleTaken(item)}
      handleNotTaken={() => handleNotTaken(item)}
    />
  );

  const renderDisplayDrugCardItem = ({
    item,
  }: {
    item: DrugDocumentWithUser;
  }) => (
    <DisplayDrugCard
      name={item.name}
      description={item.description}
      timing={item.timing.join(",")}
      canBeTaken={item.canbetaken}
      startDate={item.startdate}
      endDate={item.enddate}
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
      keyExtractor={(item) => item.$id}
    />
  );
};

export default PrescriptionList;
