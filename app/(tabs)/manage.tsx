import PrescriptionList from "@/src/components/PrescriptionList";
import { prescriptions } from "@/src/mocks/prescriptionsdata";
import { View, Text, SafeAreaView } from "react-native";

const ManageScreen = () => {
  return (
    <SafeAreaView className="bg-primary flex-1">
      <View className="flex-1">
        <View className="p-4 font-psemibold">
          <Text className="text-white text-lg font-bold text-center">
            Manage
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

export default ManageScreen;
