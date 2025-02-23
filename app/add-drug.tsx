import ChipView from "@/src/components/ui/ChipView";
import CustomButton from "@/src/components/ui/CustomButton";
import FormField from "@/src/components/ui/FormField";
import FormFieldMultipleLine from "@/src/components/ui/FormFieldMultipleLine";
import { useState } from "react";
import { View, Text, ScrollView, TextInput, Button } from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
const AddDrugsScreen = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(
    new Date(new Date().setDate(new Date().getDate() + 1))
  );
  // Set endDate to the next day

  const [forms, setForms] = useState({
    name: "",
    description: "",
    dosage: "",
    timing: "",
    taken: "",
    startDate: "",
    endDate: "",
    doctor: "",
  });

  const onStartDateChange = (event: DateTimePickerEvent, date?: Date) => {
    const currentDate = date || startDate;
    setStartDate(currentDate);
  };

  const onEndDateChange = (event: DateTimePickerEvent, date?: Date) => {
    const currentDate = date || endDate;
    setEndDate(currentDate);
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
            <Text className="text-base text-gray-100 font-pmedium mt-4 mb-2">
              Taken
            </Text>
            <View className="flex-row">
              <ChipView
                label="Before Meal"
                isSelected={true}
                onPress={() => {}}
                layoutStyle={"ml-4"}
                textStyle={""}
              />
              <ChipView
                label="After Meal"
                isSelected={false}
                onPress={() => {}}
                layoutStyle={"ml-4"}
                textStyle={""}
              />
            </View>
          </View>
          <View className="mt-4">
            <Text className="text-base text-gray-100 font-pmedium mt-4 mb-2">
              Timing
            </Text>
            <View className="flex-row justify-between">
              <ChipView
                label="Morning"
                isSelected={true}
                onPress={() => {}}
                layoutStyle={"ml-2"}
                textStyle={""}
              />
              <ChipView
                label="Afternoon"
                isSelected={false}
                onPress={() => {}}
                layoutStyle={"ml-2"}
                textStyle={""}
              />
              <ChipView
                label="Evening"
                isSelected={false}
                onPress={() => {}}
                layoutStyle={"ml-2"}
                textStyle={""}
              />
              <ChipView
                label="Night"
                isSelected={false}
                onPress={() => {}}
                layoutStyle={"ml-2"}
                textStyle={""}
              />
            </View>
          </View>
          <View className={`space-y-0 mt-4`}>
            <Text className="text-base text-gray-100 font-pmedium">
              Start Date
            </Text>
            <DateTimePicker
              testID="dateTimePicker"
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
            </Text>
            <DateTimePicker
              testID="dateTimePicker"
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
            handlePress={() => {}}
            containerStyles="my-8"
            isLoading={false}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default AddDrugsScreen;
