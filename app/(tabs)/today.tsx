import CustomButton from "@/src/components/ui/CustomButton";
import TodayDrugCard from "@/src/components/TodayDrugCard";
import { prescriptions } from "@/src/mocks/prescriptionsdata";
import { prescription } from "@/src/types/prescription";
import { router } from "expo-router";
import { View, Text, FlatList, SafeAreaView } from "react-native";
import PrescriptionList from "@/src/components/prescriptionList";

export default function TodayScreen() {
  const handleAddDrugs = () => {
    router.push("/add-drugs");
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
          data={prescriptions}
          handleTaken={() => {}}
          handleNotTaken={() => {}}
        />

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
