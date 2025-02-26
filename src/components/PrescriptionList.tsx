import { FlatList } from "react-native";
import React from "react";
import { DrugDocumentWithUser } from "../types/DrugDocument";
import DrugCard from "./DrugCard";

interface PrescriptionListProps {
  data: DrugDocumentWithUser[] | undefined;
  handleEditOption: (id: string) => void;
  handleDeleteOption: (id: string) => void;
}
const PrescriptionList: React.FC<PrescriptionListProps> = ({
  data,
  handleEditOption,
  handleDeleteOption,
}) => {
  const renderDrugCardItem = ({ item }: { item: DrugDocumentWithUser }) => (
    <DrugCard
      id={item.$id}
      name={item.name}
      dosage={item.dosage}
      description={item.description}
      timing={item.timing.join(",")}
      canBeTaken={item.canbetaken}
      startdate={item.startdate}
      enddate={item.enddate}
      doctor={item.doctor}
      handleDeleteOption={handleDeleteOption}
      handleEditOption={handleEditOption}
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
