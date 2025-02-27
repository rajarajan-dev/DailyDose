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
  // Function to calculate total days and remaining days to take
  const calculateDays = (
    start: string,
    end: string
  ): {
    totalDays: number;
    remainingDays: number;
    today: Date;
    startDate: Date;
  } => {
    const parseDate = (dateString: string): Date => {
      const [day, month, year] = dateString.split("/");
      return new Date(`${year}-${month}-${day}`);
    };

    const startDate = parseDate(start); // Parse start date
    const endDate = parseDate(end); // Parse end date
    const today = new Date(); // Get today's date
    today.setHours(0, 0, 0, 0); // Normalize today's date to midnight
    startDate.setHours(0, 0, 0, 0); // Normalize startDate to midnight
    endDate.setHours(0, 0, 0, 0); // Normalize endDate to midnight

    // Calculate total days
    const totalTime = endDate.getTime() - startDate.getTime();
    const totalDays = Math.ceil(totalTime / (1000 * 60 * 60 * 24)) + 1;

    // Calculate remaining days
    let remainingDays = 0;

    if (today < startDate) {
      // Drug is in the future
      remainingDays = totalDays;
    } else if (today >= startDate && today <= endDate) {
      // Drug is ongoing
      const remainingTime = endDate.getTime() - today.getTime();
      remainingDays = Math.ceil(remainingTime / (1000 * 60 * 60 * 24)) + 1;
    } else {
      // Drug is completed
      remainingDays = 0;
    }

    return { totalDays, remainingDays, today, startDate };
  };
  // Calculate total and remaining days
  const { totalDays, remainingDays, today, startDate } = calculateDays(
    startdate,
    enddate
  );

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
        <Text className="text-gray-700 font-psemibold text-base mt-1">
          Dosage :{" "}
          <Text className="text-gray-600 font-psemibold text-base">
            {dosage}
          </Text>
        </Text>
      )}

      {/* Timing */}
      {timing && (
        <Text className="text-gray-600 font-psemibold text-base mt-1">
          Timing :{" "}
          <Text className="text-gray-500 font-psemibold text-base">
            {timing}
          </Text>
        </Text>
      )}

      {/* Should Be Taken */}
      {canBeTaken && (
        <Text className="text-gray-600 font-psemibold text-base mt-1">
          Should Be Taken :{" "}
          <Text className="text-gray-500 font-psemibold text-base">
            {canBeTaken}
          </Text>
        </Text>
      )}

      {/* Prescribed By */}
      {doctor && (
        <Text className="text-gray-600 font-psemibold text-base mt-1">
          Prescribed By :{" "}
          <Text className="text-gray-500 font-psemibold text-base">
            {doctor}
          </Text>
        </Text>
      )}

      {/* Duration */}
      {startdate && enddate && (
        <View>
          <Text className="text-gray-600 font-psemibold text-base mt-1">
            Duration :{" "}
            <Text className="text-gray-500 font-psemibold text-base">
              {startdate} to {enddate}
            </Text>
          </Text>
          <View className="flex-row justify-end">
            {/* Total Days and Remaining Days */}
            <Text className="text-gray-700 font-psemibold text-base text-right">
              Total: {totalDays} days / {remainingDays} days left
            </Text>
            <View
              className={`px-2 py-1 rounded-full ml-2 ${
                remainingDays > 0
                  ? "bg-gray-200" // Ongoing or future drug
                  : "bg-green-100" // Completed drug
              }`}
            >
              <Text
                className={`text-xs ${
                  remainingDays > 0
                    ? "text-gray-600" // Ongoing or future drug
                    : "text-green-700" // Completed drug
                }`}
              >
                {remainingDays > 0
                  ? today < startDate
                    ? "Starts in the future" // Future drug
                    : "includes today" // Ongoing drug
                  : "Drug completed"}
              </Text>
            </View>
          </View>
        </View>
      )}

      {/* Drug Action Buttons */}
      <View className="flex-row justify-between mt-4">
        <TouchableOpacity
          className="bg-red-500 px-6 py-2 rounded"
          onPress={() => handleDeleteOption(id)}
        >
          <Text className="text-white font-bold">Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-green-500 px-10 py-2 rounded"
          onPress={() => handleEditOption(id)}
        >
          <Text className="text-white font-bold">Edit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DrugCard;
