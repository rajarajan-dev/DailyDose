import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Alert,
  TouchableOpacity,
  Platform,
  StatusBar,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "@/src/components/ui/FormField";
import ChipView from "@/src/components/ui/ChipView";
import CustomButton from "@/src/components/ui/CustomButton";
import { router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import useSessionCleanup from "@/src/hooks/useSessionCleanup";

const FilterScreen = () => {
  const { clearSessionAndCredentials, isClearing } = useSessionCleanup();

  const timingsOptions = ["Breakfast", "Lunch", "Evening", "Night"];

  // State for filter options
  const [drugName, setDrugName] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [timing, setTiming] = useState<string[]>([]);
  const [canBeTaken, setCanBeTaken] = useState<"before" | "after" | "">("");
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
  const handleCanBeTakenSelectd = (selectedCanBeTaken: "before" | "after") => {
    setCanBeTaken(selectedCanBeTaken);
  };

  const ResetFilters = () => {
    // State for filter options
    setDrugName("");
    setStartDate(new Date());
    setEndDate(new Date());
    setTiming([]);
    setCanBeTaken("");
    setDoctor("");
  };

  // Apply filters and navigate to the results screen
  const applyFilters = () => {
    const filters = {
      drugName,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      timing: JSON.stringify(timing), // Convert array to string for query params
      canBeTaken,
      doctor,
    };

    // Date validation: endDate should be same or after startDate
    if (endDate < startDate) {
      Alert.alert(
        "Validation Error",
        "End date cannot be before the start date."
      );
      return;
    }

    // Navigate to the FilterScreen and pass the filters as query parameters
    router.push({
      pathname: "/filter-drug-list",
      params: filters,
    });
  };

  const handleLogout = () => {
    clearSessionAndCredentials();
    router.push("/(auth)/sign-in");
  };

  return (
    <SafeAreaView
      className="flex-1 bg-primary"
      style={{
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}
    >
      <ScrollView className="p-4 ">
        <View className="relative items-center p-4">
          <Text className="text-white text-lg font-bold text-center font-psemibold ">
            Filter
          </Text>
          {/* Logout Icon (Aligned to the Right) */}
          <TouchableOpacity
            onPress={handleLogout}
            className="absolute right-4 top-4"
          >
            <Ionicons name="log-out-outline" size={24} color="white" />
          </TouchableOpacity>
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
          <Text className="text-base text-gray-100 font-pmedium">
            Should Be Taken
          </Text>
          <View className="flex-row">
            <ChipView
              label="Before Food"
              isSelected={canBeTaken === "before"}
              onPress={() => handleCanBeTakenSelectd("before")}
              layoutStyle="ml-2"
              textStyle=""
            />
            <ChipView
              label="After Food"
              isSelected={canBeTaken === "after"}
              onPress={() => handleCanBeTakenSelectd("after")}
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
            containerStyles="bg-secondary py-2 rounded-lg px-8"
            textStyles="font-pregular text-base"
            handlePress={ResetFilters}
            isLoading={false}
          />

          <CustomButton
            title="Apply"
            containerStyles="bg-secondary py-2 rounded-lg px-8"
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
