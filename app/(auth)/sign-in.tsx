import {
  View,
  Text,
  SafeAreaView,
  Dimensions,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useState } from "react";
import FormField from "@/src/components/ui/FormField";
import CustomButton from "@/src/components/ui/CustomButton";
import "../../global.css";
import { router } from "expo-router";
import { icons } from "@/src/constants";
import React from "react";
import { StateContext } from "@/src/providers/StateContext";
import { AppwriteService } from "@/src/appwrite/AppwriteService";

export default function signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  const { isLoading, setIsLogin, setIsLoading, setUserId } =
    React.useContext(StateContext);

  const validateInputs = (email: string, password: string) => {
    let errors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Invalid email format";
    }

    if (!password.trim()) {
      errors.password = "Password is required";
    }

    return errors;
  };

  function handleForgotPassword() {
    router.push("/forgot");
  }

  function handleSignIn() {
    const validationErrors = validateInputs(email, password);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length !== 0) {
      return;
    }

    setIsLoading(true);
    const promise = AppwriteService.getInstance()
      .createSession(email, password)
      .then();

    promise.then(
      function (response) {
        setIsLoading(false);
        setIsLogin(true);
        setUserId(response.userId);
        router.push("/(tabs)/today");
      },
      function (error) {
        setIsLoading(false);
        Alert.alert("Sign In", error.message);
      }
    );
  }

  function handleSignUp() {
    router.push("/(auth)/sign-up");
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <View
        className="px-4"
        style={{
          marginTop: Dimensions.get("screen").height * 0.2,
        }}
      >
        <Text className="text-2xl font-semibold text-white font-psemibold text-center">
          Sign In!
        </Text>

        <FormField
          title="Email Id"
          value={email}
          handleChangeText={(value) => {
            setEmail(value);
          }}
          otherStyles="mt-8"
          keyboardType="default"
          placeholder="Email Id"
        />
        {errors.email && <Text style={styles.error}>{errors.email}</Text>}

        <FormField
          title="Password"
          value={password}
          handleChangeText={(value) => {
            setPassword(value);
          }}
          otherStyles="mt-8"
          keyboardType="default"
          placeholder="Password"
        />

        {errors.password && <Text style={styles.error}>{errors.password}</Text>}

        <TouchableOpacity onPress={handleForgotPassword}>
          <Text className="text-sm font-semibold mt-3 text-right mr-2 underline text-secondary-100">
            Forgot Password
          </Text>
        </TouchableOpacity>

        <CustomButton
          title="Sign In"
          handlePress={handleSignIn}
          containerStyles="mt-7"
          isLoading={isLoading}
        />

        <TouchableOpacity onPress={() => {}}>
          <View className="flex mt-4 flex-row justify-end">
            <Image
              source={icons.checked}
              height={10}
              width={10}
              resizeMode="contain"
            />
            <Text className="text-sm font-semibold text-right ml-2 mr-2 underline text-secondary-100">
              Remember me
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleSignUp}>
          <Text className="text-sm font-semibold mt-7 text-right mr-2 underline text-secondary-100">
            Don't have an account?. Register!
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  error: {
    color: "red",
    marginTop: 5,
  },
});
