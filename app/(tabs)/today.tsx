import CustomButton from "@/src/components/ui/CustomButton";
import PrescriptionList from "@/src/components/PrescriptionList";
import { router } from "expo-router";
import { View, Text, SafeAreaView, Alert } from "react-native";
import useDrugs from "@/src/hooks/useDrugs";
import { AppwriteService } from "@/src/appwrite/AppwriteService";

export default function TodayScreen() {
  const { data, loading, error, refetch } = useDrugs();

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
          handleEditOption={handleEditOption}
          handleDeleteOption={handleDeleteOption}
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
}
