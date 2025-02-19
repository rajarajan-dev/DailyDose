import CustomButton from "@/src/components/CustomButton";
import TodayDrugCard from "@/src/components/TodayDrugCard";
import { prescriptions } from "@/src/mocks/prescriptionsdata";
import { prescription } from "@/src/types/prescription";
import { router } from "expo-router";
import { View, Text, FlatList, SafeAreaView } from "react-native";

export default function TodayScreen() {
  const renderItem = ({ item }: { item: prescription }) => (
    <TodayDrugCard
      name={item.name}
      description={item.description}
      timing={"Morning, Lunch, Evening, Night"}
      taken={item.taken}
      startDate={item.startDate}
      endDate={item.endDate}
      doctor={item.doctor}
      handleTaken={() => {}}
      handleNotTaken={() => {}}
    />
  );

  const handleAddDrugs = () => {
    router.push("/add-drugs");
  };

  return (
    <SafeAreaView className="bg-primary flex-1">
      <View className="flex-1">
        {/* Header */}
        <View className="p-4 font-psemibold">
          <Text className="text-white text-lg font-bold text-center">
            Today
          </Text>
        </View>

        {/* Body */}
        <FlatList
          data={prescriptions}
          keyExtractor={(item) => item.id.toString()} // Ensure key is a string
          renderItem={renderItem} // Use the pre-defined function
        />

        {/* Bottom */}
        <View className="p-2">
          <CustomButton
            title="Add Drugs"
            containerStyles="bg-secondary py-3 rounded-lg min-h-[34px]"
            textStyles="font-pregular text-base"
            handlePress={handleAddDrugs}
            isLoading={false}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
