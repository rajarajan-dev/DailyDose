import {
  View,
  Text,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from "react-native";
import {
  router,
  Stack,
  useFocusEffect,
  useLocalSearchParams,
} from "expo-router";
import useDrugsByFilters from "@/src/hooks/useDrugsByFilters";
import PrescriptionList from "@/src/components/PrescriptionList";
import { getStringValue } from "@/src/helper/getStringValue";
import { AppwriteService } from "@/src/appwrite/AppwriteService";
import CustomButton from "@/src/components/ui/CustomButton";
import { useCallback } from "react";
import ShowLoadingScreen from "@/src/components/ui/ShowLoadingScreen";
import APIFailureMessage from "@/src/components/ui/APIFailureMessage";

export default function FilterDrugListScreen() {
  // Access the filters from the query parameters
  const params = useLocalSearchParams();

  // Parse the filters
  const filters = {
    drugName: getStringValue(params.drugName),
    startDate: getStringValue(params.startDate),
    endDate: getStringValue(params.endDate),
    timing: params.timing ? JSON.parse(getStringValue(params.timing)) : [], // Convert string back to array
    canBeTaken: getStringValue(params.canBeTaken),
    doctor: getStringValue(params.doctor),
  };

  // Hook to fetch drugs based on filters
  const { data, loading, error, refetch } = useDrugsByFilters({
    drugName: filters.drugName,
    startDate: filters.startDate,
    endDate: filters.endDate,
    timing: filters.timing,
    canBeTaken: filters.canBeTaken,
    doctor: filters.doctor,
  });

  // Refetch data when the screen is focused
  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  const handleEditOption = (id: string) => {
    router.push({ pathname: "/add-drug", params: { id } }); // Pass the drug ID to the AddDrugsScreen
  };

  const handleDeleteOption = async (id: string) => {
    try {
      await AppwriteService.getInstance().deleteDrugDocument(id);
      refetch(); // Refresh the drug list after deletion
    } catch (error) {
      console.error("Error deleting drug:", error);
      Alert.alert("Error", "Failed to delete the drug.");
    }
  };

  // Show loading indicator
  if (loading) {
    return <ShowLoadingScreen />;
  }

  // Show error message
  if (error) {
    return <APIFailureMessage message={error.message} handlePress={refetch} />;
  }

  // Show empty state message if no drugs are available
  if (!data || data.length === 0) {
    return (
      <SafeAreaView className="bg-primary flex-1 justify-center items-center">
        <Text className="text-white text-lg font-bold text-center">
          No drugs found.
        </Text>
        <Text className="text-white text-center mt-2">
          Please adjust your filter options and try again.
        </Text>
      </SafeAreaView>
    );
  }

  // show drug count
  const count = data ? " - (" + data.length.toString() + ")" : "";

  return (
    <SafeAreaView className="bg-primary flex-1">
      <View className="flex-1">
        <Stack.Screen
          options={{
            title: "Filtered Drugs",
            headerTitle: "Filtered Drugs" + count,
          }}
        />
        {/* Render the data or loading/error states */}
        <PrescriptionList
          data={data}
          handleEditOption={handleEditOption}
          handleDeleteOption={handleDeleteOption}
        />
      </View>
    </SafeAreaView>
  );
}
