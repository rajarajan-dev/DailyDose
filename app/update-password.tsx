import { View, SafeAreaView, ScrollView, Alert } from "react-native";
import CustomButton from "@/src/components/ui/CustomButton";
import { router } from "expo-router";
import FormField from "@/src/components/ui/FormField";
import { useState } from "react";
import { AppwriteService } from "@/src/appwrite/AppwriteService";
import ErrorMessage from "@/src/components/ui/ErrorMessage";

const UpdatePassword = () => {
  const [forms, setForms] = useState({
    currentPassword: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<{
    currentPassword?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const [isLoading, setIsLoading] = useState(false);

  const validateInputs = () => {
    let errors: {
      currentPassword?: string;
      password?: string;
      confirmPassword?: string;
    } = {};
    if (!forms.currentPassword || !forms.password || !forms.confirmPassword) {
      errors.currentPassword = "Current Password is required";
      errors.password = "Password is required";
      errors.confirmPassword = "Confirm Password is required";
    } else if (forms.password !== forms.confirmPassword) {
      errors.confirmPassword = "Password and Confirm Password should be same";
    }
    return errors;
  };

  const handleUpdatePassword = () => {
    const validationErrors = validateInputs();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length !== 0) {
      return;
    }

    setIsLoading(true);
    const promise = AppwriteService.getInstance().updatePassword(
      forms.password,
      forms.currentPassword
    );

    promise
      .then(
        function (response) {
          router.replace("/(auth)/sign-in");
        },
        function (error) {
          console.error(error);
          Alert.alert("Update Password", error);
        }
      )
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="mt-10 p-4">
          <FormField
            title="User Name"
            value={forms.currentPassword}
            handleChangeText={(value) => {
              setForms((prev) => ({
                ...prev,
                currentPassword: value,
              }));
            }}
            otherStyles="mt-8"
            keyboardType="default"
            placeholder="Current Password"
          />

          {errors.currentPassword && (
            <ErrorMessage message={errors.currentPassword} />
          )}

          <FormField
            title="New Password"
            value={forms.password}
            handleChangeText={(value) => {
              setForms((prev) => ({
                ...prev,
                password: value,
              }));
            }}
            otherStyles="mt-8"
            keyboardType="default"
            placeholder="Password"
          />

          {errors.password && <ErrorMessage message={errors.password} />}

          <FormField
            title="Confirm Password"
            value={forms.confirmPassword}
            handleChangeText={(value) => {
              setForms((prev) => ({
                ...prev,
                confirmPassword: value,
              }));
            }}
            otherStyles="mt-8"
            keyboardType="default"
            placeholder="Confirm Password"
          />

          {errors.confirmPassword && (
            <ErrorMessage message={errors.confirmPassword} />
          )}

          <CustomButton
            title="Change Password"
            handlePress={handleUpdatePassword}
            containerStyles="mt-7"
            isLoading={isLoading}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UpdatePassword;
