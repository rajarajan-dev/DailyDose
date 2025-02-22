import { View, Text, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import CustomButton from "@/src/components/ui/CustomButton";
import { router } from "expo-router";
import FormField from "@/src/components/ui/FormField";
import { useState } from "react";
import { AppwriteService } from "@/src/appwrite/AppwriteService";

const UpdatePasscode = () => {
  const [forms, setForms] = useState({
    currentPassword: "",
    password: "",
    confirmPasswode: "",
  });

  const [errors, setErrors] = useState<{
    currentPassword?: string;
    password?: string;
    confirmPasswode?: string;
  }>({});

  const [isLoading, setIsLoading] = useState(false);

  const validateInputs = () => {
    let errors: {
      currentPassword?: string;
      password?: string;
      confirmPasswode?: string;
    } = {};
    if (!forms.currentPassword || !forms.password || !forms.confirmPasswode) {
      errors.currentPassword = "Current Password is required";
      errors.password = "Password is required";
      errors.confirmPasswode = "Confirm Password is required";
    } else if (forms.password !== forms.confirmPasswode) {
      errors.confirmPasswode = "Password and Confirm Password should be same";
    }
    return errors;
  };

  const handleUpdatePasscode = () => {
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
          console.log(response);
          router.push("/(auth)/sign-in");
        },
        function (error) {
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
            <Text style={styles.error}>{errors.currentPassword}</Text>
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
          {errors.password && (
            <Text style={styles.error}>{errors.password}</Text>
          )}
          <FormField
            title="Confirm Password"
            value={forms.confirmPasswode}
            handleChangeText={(value) => {
              setForms((prev) => ({
                ...prev,
                confirmPasswode: value,
              }));
            }}
            otherStyles="mt-8"
            keyboardType="default"
            placeholder="Confirm Password"
          />
          {errors.confirmPasswode && (
            <Text style={styles.error}>{errors.confirmPasswode}</Text>
          )}

          <CustomButton
            title="Change Passcode"
            handlePress={handleUpdatePasscode}
            containerStyles="mt-7"
            isLoading={isLoading}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UpdatePasscode;

const styles = StyleSheet.create({
  error: {
    color: "red",
    marginTop: 5,
  },
});
