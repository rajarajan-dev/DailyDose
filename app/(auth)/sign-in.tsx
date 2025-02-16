import {
  View,
  Text,
  SafeAreaView,
  Dimensions,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import FormField from "@/src/components/FormField";
import CustomButton from "@/src/components/CustomButton";
import "../../global.css";
import { router } from "expo-router";
import Passcode from "@/src/components/Passcode";
import PasscodeField from "@/src/components/PasscodeField";

export default function signin() {
  const [userName, setUserName] = useState("");
  const [passcode, setPasscode] = useState("");

  function handleForgotPassword() {
    router.push("/forgot");
  }

  function handleSignIn() {
    Alert.alert("Alert", "Sign in, please login in!");
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
        <Text className="text-2xl font-semibold text-white font-psemibold">
          Sign In!
        </Text>

        <FormField
          title="UserName"
          value={userName}
          handleChangeText={(value) => {
            setUserName(value);
          }}
          otherStyles="mt-8"
          keyboardType="default"
          placeholder="UserName"
        />

        <PasscodeField
          title="Passcode"
          otherStyles="w-16"
          textStyles="text-center"
        />

        <TouchableOpacity onPress={handleForgotPassword}>
          <Text className="text-sm font-semibold mt-3 text-right mr-2 underline text-secondary-100">
            Forgot Passcode
          </Text>
        </TouchableOpacity>

        <CustomButton
          title="Sign In"
          handlePress={handleSignIn}
          containerStyles="mt-7"
          isLoading={false}
        />

        <TouchableOpacity onPress={handleSignUp}>
          <Text className="text-sm font-semibold mt-3 text-right mr-2 underline text-secondary-100">
            Don't have an account?. Register!
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
