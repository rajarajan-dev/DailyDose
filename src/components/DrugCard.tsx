import { View, Text } from "react-native";
import React from "react";
interface DrugCardProps {
  name: string;
  description: string;
  dosage: string;
  timing: string;
  canBeTaken: string;
  startdate: string;
  enddate: string;
  doctor: string;
}

const DrugCard: React.FC<DrugCardProps> = ({
  name,
  description,
  dosage,
  timing,
  canBeTaken,
  startdate,
  enddate,
  doctor,
}) => {
  return (
    <View className="bg-white p-4 rounded-lg shadow m-2">
      {/* Drug Name */}
      <Text className="text-2xl font-bold font-psemibold">{name}</Text>

      {/* Description */}
      <Text className="text-gray-600 font-pregular">{description}</Text>

      {/* Dosage */}
      <Text className="text-gray-600 font-psemibold text-xl mt-1">
        Dosage:{" "}
        <Text className="text-gray-500 font-psemibold text-base">{dosage}</Text>
      </Text>

      {/* Timing */}
      <Text className="text-gray-600 font-psemibold text-xl mt-1">
        Timing:{" "}
        <Text className="text-gray-500 font-psemibold text-base">{timing}</Text>
      </Text>

      {/* Should Be Taken */}
      <Text className="text-gray-600 font-psemibold text-xl mt-1">
        Should Be Taken:{" "}
        <Text className="text-gray-500 font-psemibold text-base">
          {canBeTaken}
        </Text>
      </Text>

      {/* Prescribed By */}
      <Text className="text-gray-600 font-psemibold text-xl mt-1">
        Prescribed By:{" "}
        <Text className="text-gray-500 font-psemibold text-base">{doctor}</Text>
      </Text>

      {/* Duration */}
      <Text className="text-gray-600 font-psemibold text-xl mt-1">
        Duration:{" "}
        <Text className="text-gray-500 font-psemibold text-base">
          {startdate} to {enddate}
        </Text>
      </Text>
    </View>
  );
};

export default DrugCard;
