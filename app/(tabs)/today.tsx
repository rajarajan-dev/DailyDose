import CustomButton from "@/src/components/ui/CustomButton";
import { prescriptions } from "@/src/mocks/prescriptionsdata";
import PrescriptionList from "@/src/components/PrescriptionList";
import { router } from "expo-router";
import { View, Text, SafeAreaView } from "react-native";

export default function TodayScreen() {
  const handleAddDrug = () => {
    router.push("/add-drug");
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
          cardType="today"
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
