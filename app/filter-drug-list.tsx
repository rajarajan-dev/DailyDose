import { View, Text, SafeAreaView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import useDrugsByFilters from "@/src/hooks/useDrugsByFilters";
import PrescriptionList from "@/src/components/PrescriptionList";
import { DrugDocumentWithUser } from "@/src/types/DrugDocument";
import { getStringValue } from "@/src/helper/getStringValue";

export default function FilterDrugListScreen() {
  // Access the filters from the query parameters
  const params = useLocalSearchParams();

  // Parse the filters
  const filters = {
    drugName: getStringValue(params.drugName),
    startDate: getStringValue(params.startDate),
    endDate: getStringValue(params.endDate),
    timing: params.timing ? JSON.parse(getStringValue(params.timing)) : [], // Convert string back to array
    status: getStringValue(params.status),
    doctor: getStringValue(params.doctor),
  };

  // Hook to fetch drugs based on filters
  const { data, loading, error } = useDrugsByFilters({
    drugName: filters.drugName,
    startDate: filters.startDate,
    endDate: filters.endDate,
    timing: filters.timing,
    status: filters.status,
    doctor: filters.doctor,
  });
  return (
    <SafeAreaView className="bg-primary flex-1">
      <View className="flex-1">
        <View className="p-4 font-psemibold">
          <Text className="text-white text-lg font-bold text-center">
            Filter Result
          </Text>
        </View>

        {/* Render the data or loading/error states */}
        {loading && <Text>Loading...</Text>}
        {error && <Text>Error: {error.message}</Text>}
        <PrescriptionList
          data={data}
          handleEditOption={(item: DrugDocumentWithUser) => {}}
          handleNotTaken={(item: DrugDocumentWithUser) => {}}
        />
      </View>
    </SafeAreaView>
  );
}
