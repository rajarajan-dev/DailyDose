import CustomButton from "@/src/components/ui/CustomButton";
import PrescriptionList from "@/src/components/PrescriptionList";
import { router } from "expo-router";
import { View, SafeAreaView, Alert, Platform, StatusBar } from "react-native";
import useDrugs from "@/src/hooks/useDrugs";
import { AppwriteService } from "@/src/appwrite/AppwriteService";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import ShowLoadingScreen from "@/src/components/ui/ShowLoadingScreen";
import APIFailureMessage from "@/src/components/ui/APIFailureMessage";
import NoDrugsFound from "@/src/components/ui/NoDrugsFound";
import Header from "@/src/components/Header";

export default function TodayScreen() {
  const { data, loading, error, refetch } = useDrugs();

  // Refetch data when the screen is focused
  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  // Handle "Add Drug" button press
  const handleAddDrug = () => {
    router.push("/add-drug");
  };

  // Handle "Edit Drug" option
  const handleEditOption = (id: string) => {
    router.push({ pathname: "/add-drug", params: { id } }); // Pass the drug ID to the AddDrugsScreen
  };

  // Handle "Delete Drug" option
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
      <NoDrugsFound
        title="No drugs found."
        subTitle="Start by adding a new drug to your list."
        handlePress={handleAddDrug}
      />
    );
  }

  return (
    <SafeAreaView
      className="bg-primary flex-1"
      style={{
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}
    >
      <View className="flex-1">
        {/* Header */}
        <Header
          title={`Today${data ? " - (" + data.length.toString() + ")" : ""}`}
        />

        {/* Display the list of drugs */}
        <PrescriptionList
          data={data}
          handleEditOption={handleEditOption}
          handleDeleteOption={handleDeleteOption}
        />

        {/* Add Drug Button */}
        <CustomButton
          title="Add Drug"
          containerStyles="bg-secondary p-2 py-3 rounded-lg min-h-[34px] m-6"
          textStyles="font-pregular text-base"
          handlePress={handleAddDrug}
          isLoading={false}
        />
      </View>
    </SafeAreaView>
  );
}
