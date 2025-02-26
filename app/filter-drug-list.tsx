import CustomButton from "@/src/components/ui/CustomButton";
import PrescriptionList from "@/src/components/PrescriptionList";
import { router } from "expo-router";
import { View, Text, SafeAreaView } from "react-native";
import { DrugDocumentWithUser } from "@/src/types/DrugDocument";
import useDrugs from "@/src/hooks/useDrugs";

export default function FilterDrugListScreen() {
  const { data, loading, error } = useDrugs({ today: true });

  return (
    <SafeAreaView className="bg-primary flex-1">
      <View className="flex-1">
        <View className="p-4 font-psemibold">
          <Text className="text-white text-lg font-bold text-center">
            Today
          </Text>
        </View>

        <PrescriptionList
          data={data}
          handleTaken={(item: DrugDocumentWithUser) => {}}
          handleNotTaken={(item: DrugDocumentWithUser) => {}}
          cardType="today"
        />
      </View>
    </SafeAreaView>
  );
}
