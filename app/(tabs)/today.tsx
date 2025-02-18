import CustomButton from "@/src/components/CustomButton";
import { prescriptions } from "@/src/mocks/prescriptionsdata";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

export default function TodayScreen() {
  return (
    <SafeAreaView className="bg-primary flex-1">
      <View className="flex-1 ">
        {/* Header */}
        <View className="p-4 font-psemibold">
          <Text className="text-white text-lg font-bold text-center">
            Today
          </Text>
        </View>

        {/* Body */}
        <FlatList
          data={prescriptions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View className="bg-white m-2 p-4 rounded-lg shadow">
              <Text className="text-lg font-bold">{item.name}</Text>
              <Text className="text-gray-600">{item.description}</Text>
              <View className="flex-row justify-between mt-2">
                <View>
                  <Text className="text-gray-700">
                    Morning: {item.timing.morning ? "✔" : "✖"}
                  </Text>
                  <Text className="text-gray-700">
                    Lunch: {item.timing.lunch ? "✔" : "✖"}
                  </Text>
                  <Text className="text-gray-700">
                    Evening: {item.timing.evening ? "✔" : "✖"}
                  </Text>
                  <Text className="text-gray-700">
                    Night: {item.timing.night ? "✔" : "✖"}
                  </Text>
                </View>
                <View>
                  <Text className="text-blue-500">{item.taken}</Text>
                  <TouchableOpacity className="mt-2 bg-green-500 px-4 py-2 rounded">
                    <Text className="text-white font-bold">Taken</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        />

        {/* Bottom */}
        <View className="p-4">
          <CustomButton
            title="Add Drugs"
            containerStyles="bg-secondary py-3 rounded-lg min-h-[40px]"
            textStyles="font-pregular text-base"
            handlePress={() => {}}
            isLoading={false}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
