import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import Ionicons from "@expo/vector-icons/Ionicons";
import FormField from "@/src/components/ui/FormField";
import CustomButton from "@/src/components/ui/CustomButton";
import { StateContext } from "@/src/providers/StateContext";
import { AppwriteService } from "@/src/appwrite/AppwriteService";
import "../../global.css";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const { isLoading, setIsLogin, setIsLoading, setUserId } =
    React.useContext(StateContext);

  // Validate inputs
  const validateInputs = () => {
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

  // Save remember me when login success and remember me is checked
  const saveToStorage = async () => {
    await SecureStore.setItemAsync("email", email);
    await SecureStore.setItemAsync("password", password);
    await SecureStore.setItemAsync("rememberme", "true");
  };

  // Clear storage when user uncheck remember me
  const clearStorage = async () => {
    await SecureStore.deleteItemAsync("email");
    await SecureStore.deleteItemAsync("password");
    await SecureStore.deleteItemAsync("rememberme");
  };

  // Handle sign-in
  const handleSignIn = async () => {
    const validationErrors = validateInputs();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length !== 0) {
      return;
    }

    setIsLoading(true);

    try {
      // Clear existing session if any
      const sessionId = await SecureStore.getItemAsync("sessionid");
      if (sessionId) {
        await AppwriteService.getInstance().closeSession(sessionId);
      }

      // Create new session
      const promise = AppwriteService.getInstance().createSession(
        email,
        password
      );

      promise.then(
        async function (response) {
          setIsLogin(true);
          setUserId(response.userId);
          await SecureStore.setItemAsync("sessionid", response.$id);

          // Save credentials if "Remember Me" is enabled
          rememberMe ? saveToStorage() : clearStorage();

          router.push("/(tabs)/today");
        },
        function (error) {
          Alert.alert("Sign In", error.message);
        }
      );
    } catch {
    } finally {
      setIsLoading(false);
    }
  };

  // Load saved credentials on component mount
  useEffect(() => {
    const loadCredentials = async () => {
      try {
        const savedEmail = await SecureStore.getItemAsync("email");
        const savedPassword = await SecureStore.getItemAsync("password");
        const rememberMe = await SecureStore.getItemAsync("rememberme");
        if (savedEmail && savedPassword) {
          setEmail(savedEmail);
          setPassword(savedPassword);
          if (rememberMe && rememberMe === "true") {
            setRememberMe(true);
          } else {
            setRememberMe(false);
          }
        }
      } catch (error) {
        console.error("Error loading credentials:", error);
      }
    };
    loadCredentials();
  }, []);

  return (
    <SafeAreaView className="bg-primary h-full">
      <View className="px-4 mt-[30%]">
        <Text className="text-2xl font-semibold text-white font-psemibold text-center">
          Sign In!
        </Text>

        <FormField
          title="Email Id"
          value={email}
          handleChangeText={setEmail}
          otherStyles="mt-8"
          keyboardType="email-address"
          placeholder="Email Id"
        />
        {errors.email && (
          <Text className="text-red-500 mt-2">{errors.email}</Text>
        )}

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

        {errors.password && (
          <Text className="text-red-500 mt-2">{errors.password}</Text>
        )}

        <TouchableOpacity
          onPress={() => {
            router.push("/forgot");
          }}
        >
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

        <TouchableOpacity onPress={() => setRememberMe((prev) => !prev)}>
          <View className="flex mt-4 flex-row justify-end">
            <Ionicons
              name={
                rememberMe ? "checkmark-circle" : "checkmark-circle-outline"
              }
              size={18}
              color={rememberMe ? "orange" : "white"}
            />
            <Text className="text-sm font-semibold text-right ml-1 mr-2 underline text-secondary-100">
              Remember me
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            router.push("/(auth)/sign-up");
          }}
        >
          <Text className="text-sm font-semibold mt-7 text-right mr-2 underline text-secondary-100">
            Don't have an account?. Register!
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
