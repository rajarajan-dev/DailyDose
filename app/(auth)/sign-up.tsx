import {
  View,
  SafeAreaView,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";
import { useState } from "react";
import FormField from "@/src/components/ui/FormField";
import CustomButton from "@/src/components/ui/CustomButton";
import { router } from "expo-router";
import { AppwriteService } from "@/src/appwrite/AppwriteService";

export default function signup() {
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

  const validateInputs = () => {
    let errors: {
      email?: string;
      password?: string;
      confirmPassword?: string;
      username?: string;
    } = {};
    if (!forms.username || !forms.email || !forms.passcode) {
      errors.username = "User Name is required";
      errors.email = "Email is required";
      errors.password = "Password is required";
      errors.confirmPassword = "Confirm Password is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(forms.email)) {
      errors.email = "Invalid email format";
    } else if (forms.passcode !== forms.confirmPasscode) {
      errors.confirmPassword = "Password and Confirm Password should be same";
    }
    return errors;
  };

  const handleSignUp = () => {
    const validationErrors = validateInputs();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length !== 0) {
      return;
    }

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
          {errors.username && (
            <Text style={styles.error}>{errors.username}</Text>
          )}

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

          {errors.email && <Text style={styles.error}>{errors.email}</Text>}

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
          {errors.password && (
            <Text style={styles.error}>{errors.password}</Text>
          )}

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
            <Text style={styles.error}>{errors.confirmPassword}</Text>
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

const styles = StyleSheet.create({
  error: {
    color: "red",
    marginTop: 5,
  },
});
