import CustomButton from "@/src/components/CustomButton";
import FormField from "@/src/components/FormField";
import { useState } from "react";
import { View, Text, ScrollView } from "react-native";

const AddDrugsScreen = () => {
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
          <FormField
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
          <FormField
            title="Timing"
            value={forms.timing}
            handleChangeText={(value) => {
              setForms({ ...forms, timing: value });
            }}
            otherStyles="mt-4"
            keyboardType="default"
            placeholder="Timing"
          />
          <FormField
            title="Taken"
            value={forms.taken}
            handleChangeText={(value) => {
              setForms({ ...forms, taken: value });
            }}
            otherStyles="mt-4"
            keyboardType="default"
            placeholder="Taken"
          />
          <FormField
            title="Start Date"
            value={forms.startDate}
            handleChangeText={(value) => {
              setForms({ ...forms, startDate: value });
            }}
            otherStyles="mt-4"
            keyboardType="default"
            placeholder="Start Date"
          />
          <FormField
            title="End Date"
            value={forms.endDate}
            handleChangeText={(value) => {
              setForms({ ...forms, endDate: value });
            }}
            otherStyles="mt-4"
            keyboardType="default"
            placeholder="End Date"
          />
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
