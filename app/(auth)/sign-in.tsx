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
import { useEffect, useState } from "react";
import FormField from "@/src/components/ui/FormField";
import CustomButton from "@/src/components/ui/CustomButton";
import "../../global.css";
import { router } from "expo-router";
import { icons } from "@/src/constants";
import React from "react";
import { StateContext } from "@/src/providers/StateContext";
import { AppwriteService } from "@/src/appwrite/AppwriteService";
import * as SecureStore from "expo-secure-store";

export default function signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  const { isLoading, setIsLogin, setIsLoading, setUserId } =
    React.useContext(StateContext);

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

  function handleForgotPassword() {
    router.push("/forgot");
  }

  const handleSignIn = async () => {
    const validationErrors = validateInputs();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length !== 0) {
      return;
    }

    if (rememberMe) {
      // Save credentials to secure storage
      await SecureStore.setItemAsync("email", email);
      await SecureStore.setItemAsync("password", password);
      await SecureStore.setItemAsync(
        "rememberme",
        rememberMe ? "true" : "false"
      );
    } else {
      // Remove saved credentials
      await SecureStore.deleteItemAsync("email");
      await SecureStore.deleteItemAsync("password");
      await SecureStore.deleteItemAsync("rememberme");
    }

    setIsLoading(true);
    const sessionId = await SecureStore.getItemAsync("sessionid");
    if (sessionId) {
      AppwriteService.getInstance().closeSession(sessionId);
    }

    const promise = AppwriteService.getInstance().createSession(
      email,
      password
    );

    promise.then(
      async function (response) {
        setIsLoading(false);
        setIsLogin(true);
        setUserId(response.userId);
        await SecureStore.setItemAsync("sessionid", response.$id);
        router.push("/(tabs)/today");
      },
      function (error) {
        setIsLoading(false);
        Alert.alert("Sign In", error.message);
      }
    );
  };

  // Load saved credentials on component mount
  useEffect(() => {
    const loadCredentials = async () => {
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
    };

    loadCredentials();
  }, []);

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

        <TouchableOpacity
          onPress={() => {
            setRememberMe((prev) => !prev);
          }}
        >
          <View className="flex mt-4 flex-row justify-end">
            <Image
              key={rememberMe ? "checked" : "unchecked"} // Force re-render
              source={rememberMe ? icons.checked : icons.unchecked}
              style={{ width: 15, height: 15 }}
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
