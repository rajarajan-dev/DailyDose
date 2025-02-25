import { AppwriteService } from "@/src/appwrite/AppwriteService";
import PrescriptionList from "@/src/components/PrescriptionList";
import { DrugDocumentWithUser } from "@/src/types/DrugDocument";
import { useEffect, useState } from "react";
import { View, Text, SafeAreaView } from "react-native";

const FindScreen = () => {
  const [data, setData] = useState<DrugDocumentWithUser[]>();

  useEffect(() => {
    AppwriteService.getInstance()
      .getAccount()
      .then(function (response) {
        const userId = response.$id;
        return AppwriteService.getInstance().getListOfDrugs(userId);
      })
      .then((response) => {
        console.log("Success:", response);
        console.log(response);
        // Convert response to TypeScript model
        const drugList: DrugDocumentWithUser[] = response.documents.map(
          (doc) => ({
            $id: doc.$id,
            name: doc.name,
            description: doc.description,
            dosage: doc.dosage,
            timing: doc.timing,
            canbetaken: doc.canbetaken,
            startdate: doc.startdate,
            enddate: doc.enddate,
            doctor: doc.doctor,
            user_id: doc.user_id,
            taken: doc.taken,
          })
        );
        setData(drugList);
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
      });
  }, []);

  return (
    <SafeAreaView className="bg-primary flex-1">
      <View className="flex-1">
        <View className="p-4 font-psemibold">
          <Text className="text-white text-lg font-bold text-center">Find</Text>
        </View>

        <PrescriptionList
          data={data}
          handleTaken={(item: DrugDocumentWithUser) => {}}
          handleNotTaken={(item: DrugDocumentWithUser) => {}}
          cardType="display"
        />
      </View>
    </SafeAreaView>
  );
};

export default FindScreen;
