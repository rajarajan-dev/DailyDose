import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
interface TodayDrugCardProps {
  name: string;
  description: string;
  timing: string;
  taken: string;
  handleTaken: () => void;
  handleNotTaken: () => void;
}

const TodayDrugCard: React.FC<TodayDrugCardProps> = ({
  name,
  description,
  timing,
  taken,
  handleTaken,
  handleNotTaken,
}) => {
  return (
    <View className="bg-white p-4 rounded-lg shadow m-2">
      <Text className="text-2xl font-bold font-psemibold">{name}</Text>
      <Text className="text-gray-600 font-pregular">{description}</Text>
      <Text className="text-gray-600 font-psemibold text-xl mt-1">
        Timing:{" "}
        <Text className="text-gray-500 font-psemibold text-base">{timing}</Text>
      </Text>
      <Text className="text-gray-600 font-psemibold text-xl mt-1">
        Taken:{" "}
        <Text className="text-gray-500 font-psemibold text-base">{taken}</Text>
      </Text>
      <View className="flex-row justify-between mt-4">
        <TouchableOpacity className="bg-red-500 px-4 py-2 rounded">
          <Text className="text-white font-bold">Not Taken</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-green-500 px-4 py-2 rounded">
          <Text className="text-white font-bold">Taken</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TodayDrugCard;
