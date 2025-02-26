import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

const FilterScreen = () => {
  // State for filter options
  const [drugName, setDrugName] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [timing, setTiming] = useState<string[]>([]);
  const [status, setStatus] = useState<"taken" | "not-taken" | "">("");
  const [doctor, setDoctor] = useState("");

  // Handle date picker changes
  const onStartDateChange = (event: any, selectedDate?: Date) => {
    setShowStartDatePicker(false);
    if (selectedDate) {
      setStartDate(selectedDate);
    }
  };

  const onEndDateChange = (event: any, selectedDate?: Date) => {
    setShowEndDatePicker(false);
    if (selectedDate) {
      setEndDate(selectedDate);
    }
  };

  // Handle timing selection
  const handleTimingSelection = (selectedTiming: string) => {
    if (timing.includes(selectedTiming)) {
      setTiming(timing.filter((t) => t !== selectedTiming));
    } else {
      setTiming([...timing, selectedTiming]);
    }
  };

  // Handle status selection
  const handleStatusSelection = (selectedStatus: "taken" | "not-taken") => {
    setStatus(selectedStatus);
  };

  // Apply filters and navigate to the results screen
  const applyFilters = () => {
    const filters = {
      drugName,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      timing,
      status,
      doctor,
    };

    // Navigate to the results screen with the filters
    //navigation.navigate("ResultsScreen", { filters });
  };

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <ScrollView className="p-4 ">
        {/* Drug Name Filter */}
        <View className="mb-4">
          <Text className="text-lg font-bold mb-2 text-white">Drug Name</Text>
          <TextInput
            className="bg-white p-2 rounded"
            placeholder="Enter drug name"
            value={drugName}
            onChangeText={setDrugName}
          />
        </View>

        {/* Date Range Filter */}
        <View className="mb-4">
          <Text className="text-lg font-bold mb-2">Date Range</Text>
          <View className="flex-row justify-between">
            <TouchableOpacity
              className="bg-white p-2 rounded flex-1 mr-2"
              onPress={() => setShowStartDatePicker(true)}
            >
              <Text>Start Date: {startDate.toDateString()}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-white p-2 rounded flex-1 ml-2"
              onPress={() => setShowEndDatePicker(true)}
            >
              <Text>End Date: {endDate.toDateString()}</Text>
            </TouchableOpacity>
          </View>
          {showStartDatePicker && (
            <DateTimePicker
              value={startDate}
              mode="date"
              display="default"
              onChange={onStartDateChange}
            />
          )}
          {showEndDatePicker && (
            <DateTimePicker
              value={endDate}
              mode="date"
              display="default"
              onChange={onEndDateChange}
            />
          )}
        </View>

        {/* Timing Filter */}
        <View className="mb-4">
          <Text className="text-lg font-bold mb-2">Timing</Text>
          <View className="flex-row flex-wrap">
            {["Morning", "Afternoon", "Evening"].map((time) => (
              <TouchableOpacity
                key={time}
                className={`p-2 m-1 rounded ${
                  timing.includes(time) ? "bg-blue-500" : "bg-white"
                }`}
                onPress={() => handleTimingSelection(time)}
              >
                <Text
                  className={`${
                    timing.includes(time) ? "text-white" : "text-black"
                  }`}
                >
                  {time}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Status Filter */}
        <View className="mb-4">
          <Text className="text-lg font-bold mb-2">Status</Text>
          <View className="flex-row">
            <TouchableOpacity
              className={`p-2 m-1 rounded ${
                status === "taken" ? "bg-green-500" : "bg-white"
              }`}
              onPress={() => handleStatusSelection("taken")}
            >
              <Text
                className={status === "taken" ? "text-white" : "text-black"}
              >
                Taken
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`p-2 m-1 rounded ${
                status === "not-taken" ? "bg-red-500" : "bg-white"
              }`}
              onPress={() => handleStatusSelection("not-taken")}
            >
              <Text
                className={status === "not-taken" ? "text-white" : "text-black"}
              >
                Not Taken
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Doctor Filter */}
        <View className="mb-4">
          <Text className="text-lg font-bold mb-2">Doctor</Text>
          <TextInput
            className="bg-white p-2 rounded"
            placeholder="Enter doctor's name"
            value={doctor}
            onChangeText={setDoctor}
          />
        </View>

        {/* Apply Filters Button */}
        <TouchableOpacity
          className="bg-blue-500 p-3 rounded mt-4"
          onPress={applyFilters}
        >
          <Text className="text-white text-center font-bold">
            Apply Filters
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FilterScreen;
