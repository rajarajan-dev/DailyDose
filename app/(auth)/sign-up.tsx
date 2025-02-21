import { View, SafeAreaView, Dimensions, ScrollView } from "react-native";
import { useState } from "react";
import FormField from "@/src/components/ui/FormField";
import CustomButton from "@/src/components/ui/CustomButton";
import { router } from "expo-router";

export default function signup() {
  const [forms, setForms] = useState({
    username: "",
    passcode: "",
    confirmPasscode: "",
    email: "",
    phone: "",
  });

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View
          className="px-4"
          style={{
            marginTop: Dimensions.get("screen").height * 0.05,
          }}
        >
          <FormField
            title="User Name"
            value={forms.username}
            handleChangeText={(value) => {
              setForms((prev) => ({
                ...prev,
                username: value,
              }));
            }}
            otherStyles="mt-8"
            keyboardType="default"
            placeholder="User Name"
          />

          <FormField
            title="Email Id"
            value={forms.email}
            handleChangeText={(value) => {
              setForms((prev) => ({
                ...prev,
                email: value,
              }));
            }}
            otherStyles="mt-4"
            keyboardType="email-address"
            placeholder="Email Id"
          />

          <FormField
            title="Password"
            value={forms.passcode}
            handleChangeText={(value) => {
              setForms((prev) => ({
                ...prev,
                passcode: value,
              }));
            }}
            otherStyles="mt-4"
            keyboardType="default"
            placeholder="Password"
          />

          <FormField
            title="Confirm Password"
            value={forms.confirmPasscode}
            handleChangeText={(value) => {
              setForms((prev) => ({
                ...prev,
                confirmPasscode: value,
              }));
            }}
            otherStyles="mt-4"
            keyboardType="default"
            placeholder="Confirm Password"
          />

          <CustomButton
            title="Sign Up"
            handlePress={() => {
              router.back();
            }}
            containerStyles="mt-7"
            isLoading={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
