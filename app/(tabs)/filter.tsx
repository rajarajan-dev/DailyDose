import PrescriptionList from "@/src/components/prescriptionList";
import { View, Text, SafeAreaView } from "react-native";
import { prescriptions } from "@/src/mocks/prescriptionsdata";

const FilterScreen = () => {
  return (
    <SafeAreaView className="bg-primary flex-1">
      <View className="flex-1">
        <View className="p-4 font-psemibold">
          <Text className="text-white text-lg font-bold text-center">
            Filter
          </Text>
        </View>

        <PrescriptionList
          data={prescriptions}
          handleTaken={() => {}}
          handleNotTaken={() => {}}
        />
      </View>
    </SafeAreaView>
  );
};

export default FilterScreen;
