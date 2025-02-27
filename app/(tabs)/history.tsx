import { AppwriteService } from "@/src/appwrite/AppwriteService";
import PrescriptionList from "@/src/components/PrescriptionList";
import CustomButton from "@/src/components/ui/CustomButton";
import useDrugsHistory from "@/src/hooks/useDrugsManage";
import { router } from "expo-router";
import {
  View,
  Text,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

const HistoryScreen = () => {
  const { data, loading, error, refetch } = useDrugsHistory();

  // Refetch data when the screen is focused
  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  const handleAddDrug = () => {
    router.push("/add-drug");
  };

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
    return (
      <SafeAreaView className="bg-primary flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#ffffff" />
        <Text className="text-white mt-4">Loading drugs...</Text>
      </SafeAreaView>
    );
  }

  // Show error message
  if (error) {
    return (
      <SafeAreaView className="bg-primary flex-1 justify-center items-center">
        <Text className="text-white text-lg font-bold text-center">
          Error: {error.message}
        </Text>
        <CustomButton
          title="Retry"
          containerStyles="bg-secondary py-3 rounded-lg min-h-[34px] mt-4"
          textStyles="font-pregular text-base"
          handlePress={refetch}
          isLoading={false}
        />
      </SafeAreaView>
    );
  }

  // Show empty state message if no drugs are available
  if (!data || data.length === 0) {
    return (
      <SafeAreaView className="bg-primary flex-1 justify-center items-center">
        <Text className="text-white text-lg font-bold text-center">
          No drugs found.
        </Text>
        <Text className="text-white text-center mt-2">
          Start by adding a new drug to your list.
        </Text>
        <CustomButton
          title="Add Drug"
          containerStyles="bg-secondary py-3 rounded-lg min-h-[34px] mt-4"
          textStyles="font-pregular text-base"
          handlePress={handleAddDrug}
          isLoading={false}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="bg-primary flex-1">
      <View className="flex-1">
        <View className="p-4 font-psemibold">
          <Text className="text-white text-lg font-bold text-center">
            Manage{data ? " - (" + data.length.toString() + ")" : ""}
          </Text>
        </View>

        {/* Display the list of drugs */}
        <PrescriptionList
          data={data}
          handleEditOption={handleEditOption}
          handleDeleteOption={handleDeleteOption}
        />

        {/* Add Drug Button */}
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

export default HistoryScreen;
