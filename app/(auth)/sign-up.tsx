import { View, Text, SafeAreaView, Dimensions } from "react-native";
import React, { useState } from "react";
import FormField from "@/src/components/FormField";
import CustomButton from "@/src/components/CustomButton";
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
      <View
        className="px-4"
        style={{
          marginTop: Dimensions.get("screen").height * 0.05,
        }}
      >
        <Text className="text-2xl font-semibold text-white font-psemibold">
          Sign up!
        </Text>

        <FormField
          title="UserName"
          value={forms.username}
          handleChangeText={(value) => {
            setForms((prev) => ({
              ...prev,
              username: value,
            }));
          }}
          otherStyles="mt-8"
          keyboardType="default"
          placeholder="UserName"
        />

        <FormField
          title="Passcode"
          value={forms.passcode}
          handleChangeText={(value) => {
            setForms((prev) => ({
              ...prev,
              passcode: value,
            }));
          }}
          otherStyles="mt-4"
          keyboardType="numeric"
          placeholder="Passcode"
        />

        <FormField
          title="Confirm Passcode"
          value={forms.confirmPasscode}
          handleChangeText={(value) => {
            setForms((prev) => ({
              ...prev,
              confirmPasscode: value,
            }));
          }}
          otherStyles="mt-4"
          keyboardType="numeric"
          placeholder="Confirm Passcode"
        />

        <FormField
          title="Email"
          value={forms.email}
          handleChangeText={(value) => {
            setForms((prev) => ({
              ...prev,
              email: value,
            }));
          }}
          otherStyles="mt-4"
          keyboardType="email-address"
          placeholder="Email"
        />

        <FormField
          title="Phone"
          value={forms.phone}
          handleChangeText={(value) => {
            setForms((prev) => ({
              ...prev,
              phone: value,
            }));
          }}
          otherStyles="mt-4"
          keyboardType="numeric"
          placeholder="Phone"
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
    </SafeAreaView>
  );
}
