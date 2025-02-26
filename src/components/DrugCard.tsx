import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
interface DrugCardProps {
  id: string;
  name: string;
  description: string;
  dosage: string;
  timing: string;
  canBeTaken: string;
  startdate: string;
  enddate: string;
  doctor: string;
  handleEditOption: (id: string) => void;
  handleDeleteOption: (id: string) => void;
}

const DrugCard: React.FC<DrugCardProps> = ({
  id,
  name,
  description,
  dosage,
  timing,
  canBeTaken,
  startdate,
  enddate,
  doctor,
  handleEditOption,
  handleDeleteOption,
}) => {
  return (
    <View className="bg-white p-4 rounded-lg shadow m-2">
      {/* Drug Name */}
      <Text className="text-2xl font-bold font-psemibold">{name}</Text>

      {/* Description */}
      {description && (
        <Text className="text-gray-600 font-pregular">{description}</Text>
      )}

      {/* Dosage */}
      {dosage && (
        <Text className="text-gray-600 font-psemibold text-xl mt-1">
          Dosage:{" "}
          <Text className="text-gray-500 font-psemibold text-base">
            {dosage}
          </Text>
        </Text>
      )}

      {/* Timing */}
      {timing && (
        <Text className="text-gray-600 font-psemibold text-xl mt-1">
          Timing:{" "}
          <Text className="text-gray-500 font-psemibold text-base">
            {timing}
          </Text>
        </Text>
      )}

      {/* Should Be Taken */}
      {canBeTaken && (
        <Text className="text-gray-600 font-psemibold text-xl mt-1">
          Should Be Taken:{" "}
          <Text className="text-gray-500 font-psemibold text-base">
            {canBeTaken}
          </Text>
        </Text>
      )}

      {/* Prescribed By */}
      {doctor && (
        <Text className="text-gray-600 font-psemibold text-xl mt-1">
          Prescribed By:{" "}
          <Text className="text-gray-500 font-psemibold text-base">
            {doctor}
          </Text>
        </Text>
      )}

      {/* Duration */}
      {startdate && enddate && (
        <Text className="text-gray-600 font-psemibold text-xl mt-1">
          Duration:{" "}
          <Text className="text-gray-500 font-psemibold text-base">
            {startdate} to {enddate}
          </Text>
        </Text>
      )}

      {/* Drug Action Buttons */}
      <View className="flex-row justify-between mt-4">
        <TouchableOpacity
          className="bg-red-500 px-4 py-2 rounded"
          onPress={() => handleDeleteOption(id)}
        >
          <Text className="text-white font-bold">Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-green-500 px-4 py-2 rounded"
          onPress={() => handleEditOption(id)}
        >
          <Text className="text-white font-bold">Edit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DrugCard;
