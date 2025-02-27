import { useState } from "react";
import { View, SafeAreaView, ScrollView, Text, Alert } from "react-native";
import { router } from "expo-router";
import FormField from "@/src/components/ui/FormField";
import CustomButton from "@/src/components/ui/CustomButton";
import { AppwriteService } from "@/src/appwrite/AppwriteService";
import ErrorMessage from "@/src/components/ui/ErrorMessage";

export default function SignUp() {
  const [forms, setForms] = useState({
    username: "",
    passcode: "",
    confirmPasscode: "",
    email: "",
  });

  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    confirmPassword?: string;
    username?: string;
  }>({});

  const [isLoading, setIsLoading] = useState(false);

  // Validate form inputs
  const validateInputs = () => {
    let errors: {
      email?: string;
      password?: string;
      confirmPassword?: string;
      username?: string;
    } = {};

    if (!forms.username) {
      errors.username = "User Name is required";
    }

    if (!forms.email) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(forms.email)) {
      errors.email = "Invalid email format";
    }

    if (!forms.passcode) {
      errors.password = "Password is required";
    }

    if (!forms.confirmPasscode) {
      errors.confirmPassword = "Confirm Password is required";
    } else if (forms.passcode !== forms.confirmPasscode) {
      errors.confirmPassword = "Password and Confirm Password must match";
    }
    return errors;
  };

  // Handle sign-up
  const handleSignUp = () => {
    const validationErrors = validateInputs();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length !== 0) {
      return;
    }

    // Create Account
    setIsLoading(true);
    const promise = AppwriteService.getInstance().createAccount(
      forms.email,
      forms.passcode,
      forms.username
    );
    promise
      .then(
        function (response) {
          router.push("/(auth)/sign-in");
        },
        function (error) {
          Alert.alert("Sign Up", error.message);
          console.error(error);
        }
      )
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="px-4 mt-[5%]">
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
          {errors.username && <ErrorMessage message={errors.username} />}

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
          {errors.email && <ErrorMessage message={errors.email} />}

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
          {errors.password && <ErrorMessage message={errors.password} />}

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
          {errors.confirmPassword && (
            <ErrorMessage message={errors.confirmPassword} />
          )}

          <CustomButton
            title="Sign Up"
            handlePress={handleSignUp}
            containerStyles="mt-7"
            isLoading={isLoading}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
