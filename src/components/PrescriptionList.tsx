import { FlatList } from "react-native";
import React from "react";
import { DrugDocumentWithUserAndDocId } from "../types/DrugDocument";
import DrugCard from "./DrugCard";
import formatDate from "../helper/formatDate";

interface PrescriptionListProps {
  data: DrugDocumentWithUserAndDocId[] | undefined;
  handleEditOption: (id: string) => void;
  handleDeleteOption: (id: string) => void;
}
const PrescriptionList: React.FC<PrescriptionListProps> = ({
  data,
  handleEditOption,
  handleDeleteOption,
}) => {
  const renderDrugCardItem = ({
    item,
  }: {
    item: DrugDocumentWithUserAndDocId;
  }) => (
    <DrugCard
      id={item.$id}
      name={item.name}
      dosage={item.dosage}
      description={item.description}
      timing={item.timing.join(",")}
      canBeTaken={item.canbetaken}
      startdate={formatDate(new Date(item.startdate))}
      enddate={formatDate(new Date(item.enddate))}
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
