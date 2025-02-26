import { FlatList } from "react-native";
import React from "react";
import { DrugDocumentWithUser } from "../types/DrugDocument";
import DrugCard from "./DrugCard";

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
  const renderDrugCardItem = ({ item }: { item: DrugDocumentWithUser }) => (
    <DrugCard
      name={item.name}
      dosage={item.dosage}
      description={item.description}
      timing={item.timing.join(",")}
      canBeTaken={item.canbetaken}
      startdate={item.startdate}
      enddate={item.enddate}
      doctor={item.doctor}
    />
  );

  return (
    <FlatList
      data={data}
      renderItem={renderDrugCardItem}
      keyExtractor={(item) => item.$id}
    />
  );
};

export default PrescriptionList;
