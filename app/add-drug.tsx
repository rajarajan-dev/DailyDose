import ChipView from "@/src/components/ui/ChipView";
import CustomButton from "@/src/components/ui/CustomButton";
import FormField from "@/src/components/ui/FormField";
import FormFieldMultipleLine from "@/src/components/ui/FormFieldMultipleLine";
import { useState } from "react";
import { View, Text, ScrollView, Alert } from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import formatDate from "@/src/helper/formatDate";
const AddDrugsScreen = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(
    new Date(new Date().setDate(new Date().getDate() + 1))
  );

  const [forms, setForms] = useState<{
    name: string;
    description: string;
    dosage: string;
    timing: string[];
    taken: string;
    startDate: string;
    endDate: string;
    doctor: string;
  }>({
    name: "",
    description: "",
    dosage: "",
    timing: [],
    taken: "Before Food",
    startDate: formatDate(startDate),
    endDate: formatDate(endDate),
    doctor: "",
  });

  const timingsOptions = ["Breakfast", "Lunch", "Evening", "Night"];

  const onStartDateChange = (event: DateTimePickerEvent, date?: Date) => {
    const currentDate = date || startDate;
    setStartDate(currentDate);
    setForms({ ...forms, startDate: formatDate(startDate) });
  };

  const onEndDateChange = (event: DateTimePickerEvent, date?: Date) => {
    const currentDate = date || endDate;
    setEndDate(currentDate);
    setForms({ ...forms, endDate: formatDate(endDate) });
  };

  const handleTaken = (taken: string) => {
    setForms({ ...forms, taken: taken });
  };

  const handleTiming = (timing: string) => {
    setForms((prev) => ({
      ...prev,
      timing: prev.timing.includes(timing)
        ? prev.timing.filter((t) => t !== timing) // Remove if already selected
        : [...prev.timing, timing], // Add if not selected
    }));
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};

    // Required field validations
    if (!forms.name.trim()) errors.name = "Name is required.";
    if (forms.timing.length === 0)
      errors.timing = "At least one timing must be selected.";
    if (!forms.taken.trim()) errors.taken = "Taken field is required.";
    if (!forms.startDate.trim()) errors.startDate = "Start date is required.";
    if (!forms.endDate.trim()) errors.endDate = "End date is required.";

    // Date validation: endDate should be same or after startDate
    if (forms.startDate && forms.endDate) {
      const start = new Date(forms.startDate);
      const end = new Date(forms.endDate);

      if (end < start) {
        errors.endDate = "End date cannot be before the start date.";
      }
    }

    return errors; // Returns an object with error messages
  };

  const handleSubmit = () => {
    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      console.log("Validation Errors:", errors);
      const errorMessage = Object.values(errors).join("\n");
      Alert.alert("Validation Error", errorMessage);
    } else {
      console.log("Form submitted successfully:", forms);
      // Proceed with form submission
    }
  };

  return (
    <View className="flex-1 bg-primary">
      <ScrollView>
        <View className="p-4">
          <FormField
            title="Drug Name"
            value={forms.name}
            handleChangeText={(value) => {
              setForms({ ...forms, name: value });
            }}
            otherStyles="mt-4"
            keyboardType="default"
            placeholder="Drug Name"
            isOptional={false}
          />
          <FormFieldMultipleLine
            title="Description"
            value={forms.description}
            handleChangeText={(value) => {
              setForms({ ...forms, description: value });
            }}
            otherStyles="mt-4"
            keyboardType="default"
            placeholder="Description"
          />

          <FormField
            title="Dosage"
            value={forms.dosage}
            handleChangeText={(value) => {
              setForms({ ...forms, dosage: value });
            }}
            otherStyles="mt-4"
            keyboardType="default"
            placeholder="Dosage"
          />

          <View className="mt-4">
            <Text className="text-base text-gray-100 font-pmedium">
              Taken
              <Text className="text-red text-base">*</Text>
            </Text>
            <View className="flex-row">
              <ChipView
                label="Before Food"
                isSelected={forms.taken === "Before Food"}
                onPress={() => {
                  handleTaken("Before Food");
                }}
                layoutStyle={"ml-4"}
                textStyle={""}
              />
              <ChipView
                label="After Food"
                isSelected={forms.taken === "After Food"}
                onPress={() => {
                  handleTaken("After Food");
                }}
                layoutStyle={"ml-4"}
                textStyle={""}
              />
            </View>
          </View>
          <View className="mt-4">
            <Text className="text-base text-gray-100 font-pmedium">
              Timing
              <Text className="text-red text-base">*</Text>
            </Text>
            <View className="flex-row justify-between">
              <ChipView
                label={timingsOptions[0]}
                isSelected={
                  forms.timing.findIndex((f) => f === timingsOptions[0]) != -1
                }
                onPress={() => {
                  handleTiming(timingsOptions[0]);
                }}
                layoutStyle={"ml-2"}
                textStyle={""}
              />
              <ChipView
                label={timingsOptions[1]}
                isSelected={
                  forms.timing.findIndex((f) => f === timingsOptions[1]) != -1
                }
                onPress={() => {
                  handleTiming(timingsOptions[1]);
                }}
                layoutStyle={"ml-2"}
                textStyle={""}
              />
              <ChipView
                label={timingsOptions[2]}
                isSelected={
                  forms.timing.findIndex((f) => f === timingsOptions[2]) != -1
                }
                onPress={() => {
                  handleTiming(timingsOptions[2]);
                }}
                layoutStyle={"ml-2"}
                textStyle={""}
              />
              <ChipView
                label={timingsOptions[3]}
                isSelected={
                  forms.timing.findIndex((f) => f === timingsOptions[3]) != -1
                }
                onPress={() => {
                  handleTiming(timingsOptions[3]);
                }}
                layoutStyle={"ml-2"}
                textStyle={""}
              />
            </View>
          </View>
          <View className={`space-y-0 mt-4`}>
            <Text className="text-base text-gray-100 font-pmedium">
              Start Date
              <Text className="text-red text-base">*</Text>
            </Text>
            <DateTimePicker
              value={startDate}
              mode="date"
              is24Hour={false}
              onChange={onStartDateChange}
              themeVariant="dark"
            />
          </View>

          <View className={`space-y-0 mt-4`}>
            <Text className="text-base text-gray-100 font-pmedium">
              End Date
              <Text className="text-red text-base">*</Text>
            </Text>
            <DateTimePicker
              value={endDate}
              mode="date"
              is24Hour={false}
              onChange={onEndDateChange}
              themeVariant="dark"
            />
          </View>

          <FormField
            title="Doctor"
            value={forms.doctor}
            handleChangeText={(value) => {
              setForms({ ...forms, doctor: value });
            }}
            otherStyles="mt-4"
            keyboardType="default"
            placeholder="Doctor"
          />
          <CustomButton
            title="Add Drug"
            handlePress={handleSubmit}
            containerStyles="my-8"
            isLoading={false}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default AddDrugsScreen;
