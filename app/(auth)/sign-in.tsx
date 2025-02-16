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

export default function signin() {
  const [userName, setUserName] = useState("");
  const [passcode, setPasscode] = useState("");

  function handleForgotPassword() {
    router.push("/forgot");
  }

  function handleSignIn() {
    Alert.alert("RxNT", "Sign in, please login in!");
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

        <FormField
          title="Passcode"
          value={passcode}
          handleChangeText={(value) => {
            setUserName(value);
          }}
          otherStyles="mt-4"
          keyboardType="default"
          placeholder="Passcode"
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
