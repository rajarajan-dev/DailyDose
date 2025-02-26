import { AppwriteService } from "@/src/appwrite/AppwriteService";
import PrescriptionList from "@/src/components/PrescriptionList";
import CustomButton from "@/src/components/ui/CustomButton";
import { DrugDocumentWithUser } from "@/src/types/DrugDocument";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, SafeAreaView } from "react-native";

const ManageScreen = () => {
  const [data, setData] = useState<DrugDocumentWithUser[]>();
  const handleAddDrug = () => {
    router.push("/add-drug");
  };

  useEffect(() => {
    AppwriteService.getInstance()
      .getAccount()
      .then(function (response) {
        const userId = response.$id;
        return AppwriteService.getInstance().getListOfDrugsforToday(userId);
      })
      .then((response) => {
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
          <Text className="text-white text-lg font-bold text-center">
            Manage
          </Text>
        </View>

        <PrescriptionList
          data={data}
          handleEditOption={(item: DrugDocumentWithUser) => {}}
          handleNotTaken={(item: DrugDocumentWithUser) => {}}
        />

        <View className="p-2">
          <CustomButton
            title="Add Drug"
            containerStyles="bg-secondary py-3 rounded-lg min-h-[34px]"
            textStyles="font-pregular text-base"
            handlePress={handleAddDrug}
            isLoading={false}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ManageScreen;
