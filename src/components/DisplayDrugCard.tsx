import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
interface DisplayDrugCardProps {
  name: string;
  description: string;
  timing: string;
  taken: string;
  startDate: string;
  endDate: string;
  doctor: string;
}

const DisplayDrugCard: React.FC<DisplayDrugCardProps> = ({
  name,
  description,
  timing,
  taken,
  startDate,
  endDate,
  doctor,
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
      <View className="h-0.5 bg-gray-200 my-2"></View>
      <Text className="text-gray-600 font-psemibold text-xl">
        Date:{" "}
        <Text className="text-gray-500 font-psemibold text-base">
          {startDate} - {endDate}
        </Text>
      </Text>
      <Text className="text-gray-600 font-psemibold text-xl">
        Doctor:{" "}
        <Text className="text-gray-500 font-psemibold text-base">{doctor}</Text>
      </Text>
    </View>
  );
};

export default DisplayDrugCard;
