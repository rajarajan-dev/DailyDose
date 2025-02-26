import { useState } from "react";
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

  const ResetFilters = () => {
    // State for filter options
    setDrugName("");
    setStartDate(new Date());
    setEndDate(new Date());
    setTiming([]);
    setStatus("");
    setDoctor("");
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
    console.log("Filters Applied:", filters);
  };

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <ScrollView className="p-4 ">
        <View className="p-4 font-psemibold">
          <Text className="text-white text-lg font-bold text-center">
            Filters
          </Text>
        </View>
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
        <View className="mt-4">
          <Text className="text-base text-gray-100 font-pmedium">
            Date Range
          </Text>
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
          <Text className="text-base text-gray-100 font-pmedium">Timing</Text>
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
        <View className="mt-4">
          <Text className="text-base text-gray-100 font-pmedium">Status</Text>
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
        <View className="py-6 flex-row justify-evenly">
          <CustomButton
            title="Reset"
            containerStyles="bg-secondary py-5 rounded-lg min-h-[25px] px-5"
            textStyles="font-pregular text-base"
            handlePress={ResetFilters}
            isLoading={false}
          />

          <CustomButton
            title="Apply"
            containerStyles="bg-secondary py-5 rounded-lg min-h-[25px] px-5"
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
