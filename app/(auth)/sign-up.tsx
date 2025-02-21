import { View, Text, SafeAreaView, Dimensions, ScrollView } from "react-native";
import { useState } from "react";
import FormField from "@/src/components/ui/FormField";
import CustomButton from "@/src/components/ui/CustomButton";
import { router } from "expo-router";
import PasscodeField from "@/src/components/PasscodeField";

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
            title="Email"
            value={forms.email}
            handleChangeText={(value) => {
              setForms((prev) => ({
                ...prev,
                email: value,
              }));
            }}
            otherStyles="mt-0"
            keyboardType="email-address"
            placeholder="Email"
          />

          <PasscodeField
            title="Passcode"
            otherStyles="w-16"
            textStyles="text-center"
          />

          <PasscodeField
            title="Confirm Passcode"
            otherStyles="w-16"
            textStyles="text-center"
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
