import {  useState } from "react";
import { View, Text, ScrollView } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "@/src/components/ui/FormField";
import ChipView from "@/src/components/ui/ChipView";
import CustomButton from "@/src/components/ui/CustomButton";

const FilterScreen = () => {
  const timingsOptions = ["Breakfast", "Lunch", "Evening", "Night"];

  // State for filter options
  const [drugName, setDrugName] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [timing, setTiming] = useState<string[]>([]);
  const [status, setStatus] = useState<"taken" | "not-taken" | "">("");
  const [doctor, setDoctor] = useState("");

  // Handle date picker changes
  const onStartDateChange = (event: any, selectedDate?: Date) => {
    if (selectedDate) {
      setStartDate(selectedDate);
    }
  };

  const onEndDateChange = (event: any, selectedDate?: Date) => {
    if (selectedDate) {
      setEndDate(selectedDate);
    }
  };

  // Handle timing selection
  const handleTiming = (selectedTiming: string) => {
    setTiming(
      (prev) =>
        prev.includes(selectedTiming)
          ? prev.filter((t) => t !== selectedTiming) // Remove if already selected
          : [...prev, selectedTiming] // Add if not selected
    );
  };

  // Handle status selection
  const handleStatusSelection = (selectedStatus: "taken" | "not-taken") => {
    setStatus(selectedStatus);
  };

  const ResetFilters = () => {};

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
    console.log("Filters Applied:", filters);
  };

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <ScrollView className="p-4 ">
        {/* Drug Name Filter */}
        <FormField
          title="Drug Name"
          value={drugName}
          handleChangeText={(value) => {
            setDrugName(value);
          }}
          otherStyles="mt-4"
          keyboardType="default"
          placeholder="Drug Name"
          isOptional={true}
        />

        {/* Date Range Filter */}
        <View className="mb-4">
          <Text className="text-lg font-bold mb-2 text-white">Date Range</Text>
          <View className="flex-row justify-between">
            <DateTimePicker
              value={startDate}
              mode="date"
              display="default"
              themeVariant="dark"
              onChange={onStartDateChange}
            />

            <DateTimePicker
              value={endDate}
              mode="date"
              display="default"
              themeVariant="dark"
              onChange={onEndDateChange}
            />
          </View>
        </View>

        {/* Timing Filter */}
        <View className="mt-4">
          <Text className="text-base text-gray-100 font-pmedium">
            Timing
            <Text className="text-red text-base">*</Text>
          </Text>
          <View className="flex-row justify-between">
            {timingsOptions.map((option) => (
              <ChipView
                key={option}
                label={option}
                isSelected={timing.includes(option)}
                onPress={() => handleTiming(option)}
                layoutStyle="ml-2"
                textStyle=""
              />
            ))}
          </View>
        </View>

        {/* Status Filter */}
        <View className="mb-4">
          <Text className="text-lg font-bold mb-2 text-white">Status</Text>
          <View className="flex-row">
            <ChipView
              label="Taken"
              isSelected={status === "taken"}
              onPress={() => handleStatusSelection("taken")}
              layoutStyle="ml-2"
              textStyle=""
            />
            <ChipView
              label="Not Taken"
              isSelected={status === "not-taken"}
              onPress={() => handleStatusSelection("not-taken")}
              layoutStyle="ml-2"
              textStyle=""
            />
          </View>
        </View>

        {/* Doctor Filter */}
        <FormField
          title="Doctor"
          value={doctor}
          handleChangeText={(value) => {
            setDoctor(value);
          }}
          otherStyles="mt-4"
          keyboardType="default"
          placeholder="Doctor"
          isOptional={true}
        />

        {/* Apply Filters Button */}
        <View className="py-8 flex-row justify-evenly">
          <CustomButton
            title="Reset Filters"
            containerStyles="bg-secondary py-5 rounded-lg min-h-[34px] px-5"
            textStyles="font-pregular text-base"
            handlePress={ResetFilters}
            isLoading={false}
          />

          <CustomButton
            title="Apply Filters"
            containerStyles="bg-secondary py-5 rounded-lg min-h-[34px] px-5"
            textStyles="font-pregular text-base"
            handlePress={applyFilters}
            isLoading={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FilterScreen;
