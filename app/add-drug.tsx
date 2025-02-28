import ChipView from "@/src/components/ui/ChipView";
import CustomButton from "@/src/components/ui/CustomButton";
import FormField from "@/src/components/ui/FormField";
import FormFieldMultipleLine from "@/src/components/ui/FormFieldMultipleLine";
import { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Alert,
  Platform,
  TouchableOpacity,
} from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import formatDate from "@/src/helper/formatDate";
import { DrugDocument, DrugDocumentWithUser } from "@/src/types/DrugDocument";
import { AppwriteService } from "@/src/appwrite/AppwriteService";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { getStringValue } from "@/src/helper/getStringValue";

const AddDrugsScreen = () => {
  const { id } = useLocalSearchParams(); // Get the drug ID from the route params
  const [isEditing, setIsEditing] = useState(!!id); // Check if in edit mode
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(
    new Date(new Date().setDate(new Date().getDate() + 1))
  );
  const [isloading, setIsLoading] = useState(false);

  const [forms, setForms] = useState<DrugDocument>({
    name: "",
    description: "",
    dosage: "",
    timing: [],
    canbetaken: "Before Food",
    startdate: formatDate(startDate),
    enddate: formatDate(endDate),
    doctor: "",
  });

  // State for date picker visibility (Android only)
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const timingsOptions = ["Breakfast", "Lunch", "Evening", "Night"];

  // Fetch drug details if in edit mode
  useEffect(() => {
    if (isEditing && id) {
      AppwriteService.getInstance()
        .getDrugDocumentById(id as string)
        .then((drug) => {
          setForms({
            name: drug.name,
            description: drug.description,
            dosage: drug.dosage,
            timing: drug.timing,
            canbetaken:
              drug.canbetaken === "before" ? "Before Food" : "After Food",
            startdate: drug.startdate,
            enddate: drug.enddate,
            doctor: drug.doctor,
          });
          setStartDate(new Date(drug.startdate));
          setEndDate(new Date(drug.enddate));
        })
        .catch((error) => {
          console.error("Error fetching drug details:", error);
          Alert.alert("Error", "Failed to fetch drug details.");
        });
    }
  }, [id, isEditing]);

  const onStartDateChange = (event: DateTimePickerEvent, date?: Date) => {
    if (Platform.OS === "android") {
      setShowStartDatePicker(false); // Hide the picker after selection (Android)
    }

    if (!date) return;

    setStartDate(date);
    setForms({ ...forms, startdate: formatDate(date) });
  };

  const onEndDateChange = (event: DateTimePickerEvent, date?: Date) => {
    if (Platform.OS === "android") {
      setShowEndDatePicker(false); // Hide the picker after selection (Android)
    }

    if (!date) return;

    setEndDate(date);
    setForms({ ...forms, enddate: formatDate(date) });
  };

  const handleTaken = useCallback((canbetaken: string) => {
    setForms((prev) => ({ ...prev, canbetaken }));
  }, []);

  const handleTiming = useCallback((timing: string) => {
    setForms((prev) => ({
      ...prev,
      timing: prev.timing.includes(timing)
        ? prev.timing.filter((t) => t !== timing)
        : [...prev.timing, timing],
    }));
  }, []);

  const validateForm = () => {
    const errors: Record<string, string> = {};

    // Required field validations
    if (!forms.name.trim()) errors.name = "Name is required.";
    if (forms.timing.length === 0)
      errors.timing = "At least one timing must be selected.";
    if (!forms.canbetaken.trim()) errors.taken = "Taken field is required.";
    if (!forms.startdate.trim()) errors.startDate = "Start date is required.";
    if (!forms.enddate.trim()) errors.endDate = "End date is required.";

    // Date validation: endDate should be same or after startDate
    if (endDate < startDate) {
      errors.endDate = "End date cannot be before the start date.";
    }

    return errors; // Returns an object with error messages
  };

  const handleSubmit = () => {
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      Alert.alert("Validation Error", Object.values(errors).join("\n"));
      return;
    }

    setIsLoading(true);

    AppwriteService.getInstance()
      .getAccount()
      .then((response) => {
        const userId = response.$id;
        const drugDocWithUser: DrugDocumentWithUser = {
          name: forms.name,
          description: forms.description,
          dosage: forms.dosage,
          timing: forms.timing,
          canbetaken: forms.canbetaken === "Before Food" ? "before" : "after",
          startdate: new Date(startDate).toISOString(),
          enddate: new Date(endDate).toISOString(),
          doctor: forms.doctor,
          user_id: userId,
        };

        if (isEditing && id) {
          // Update existing drug
          return AppwriteService.getInstance().updateDrugDocument({
            ...drugDocWithUser, // Spread the existing properties
            $id: getStringValue(id), // Add the $id property
          });
        } else {
          // Add new drug
          return AppwriteService.getInstance().addDrugDocument(drugDocWithUser);
        }
      })
      .then(() => {
        router.back(); // Navigate back after successful submission
      })
      .catch((error) => {
        console.error("Error:", error);
        Alert.alert("Error", "Failed to save the drug.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const headerTitle = isEditing ? "Update Drug" : "Add Drug";

  return (
    <View className="flex-1 bg-primary">
      <ScrollView>
        <View className="p-4">
          <Stack.Screen options={{ headerTitle: headerTitle }} />

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
                isSelected={forms.canbetaken === "Before Food"}
                onPress={() => {
                  handleTaken("Before Food");
                }}
                layoutStyle={"ml-4"}
                textStyle={""}
              />
              <ChipView
                label="After Food"
                isSelected={forms.canbetaken === "After Food"}
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
              {timingsOptions.map((option) => (
                <ChipView
                  key={option}
                  label={option}
                  isSelected={forms.timing.includes(option)}
                  onPress={() => handleTiming(option)}
                  layoutStyle="ml-2"
                  textStyle=""
                />
              ))}
            </View>
          </View>
          <View className={`space-y-0 mt-4`}>
            <Text className="text-base text-gray-100 font-pmedium">
              Start Date
              <Text className="text-red text-base">*</Text>
            </Text>
            {/* Start Date */}
            {Platform.OS === "android" ? (
              <TouchableOpacity onPress={() => setShowStartDatePicker(true)}>
                <View className="rounded-2xl border-2 border-black-200 p-3 bg-gray-400 ">
                  <Text className="text-white">
                    {startDate.toLocaleDateString()}
                  </Text>
                </View>
              </TouchableOpacity>
            ) : (
              <DateTimePicker
                value={startDate}
                mode="date"
                display="default"
                themeVariant="dark"
                onChange={onStartDateChange}
              />
            )}
          </View>

          <View className={`space-y-0 mt-4`}>
            <Text className="text-base text-gray-100 font-pmedium">
              End Date
              <Text className="text-red text-base">*</Text>
            </Text>
            {/* End Date */}
            {Platform.OS === "android" ? (
              <TouchableOpacity onPress={() => setShowEndDatePicker(true)}>
                <View className="rounded-2xl border-2 border-black-200 p-3 bg-gray-400 ">
                  <Text className="text-white">
                    {endDate.toLocaleDateString()}
                  </Text>
                </View>
              </TouchableOpacity>
            ) : (
              <DateTimePicker
                value={endDate}
                mode="date"
                display="default"
                themeVariant="dark"
                onChange={onEndDateChange}
              />
            )}
          </View>

          {/* Android Date Pickers */}
          {Platform.OS === "android" && (
            <>
              {showStartDatePicker && (
                <DateTimePicker
                  value={startDate}
                  mode="date"
                  display="default"
                  themeVariant="dark"
                  onChange={onStartDateChange}
                />
              )}
              {showEndDatePicker && (
                <DateTimePicker
                  value={endDate}
                  mode="date"
                  display="default"
                  themeVariant="dark"
                  onChange={onEndDateChange}
                />
              )}
            </>
          )}

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
            title={isEditing ? "Update Drug" : "Add Drug"}
            handlePress={handleSubmit}
            containerStyles="my-8 mx-8"
            isLoading={isloading}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default AddDrugsScreen;
