import { View, Text, SafeAreaView, Dimensions } from "react-native";
import React, { useState } from "react";
import FormField from "@/src/components/FormField";
import CustomButton from "@/src/components/CustomButton";
import "../../global.css";

export default function signin() {
  const [userName, setUserName] = useState("");
  const [passcode, setPasscode] = useState("");

  // User Name Input changes
  function onUserNameValueChange(text: String) {
    console.log(text);
  }

  // Login button pressed
  function onHandleLoginPressed() {}

  // sign up link pressed
  function onHandleSignUpPressed() {}

  return (
    <SafeAreaView className="bg-primary h-full">
      <View
        className="px-4"
        style={{
          marginTop: Dimensions.get("screen").height * 0.2,
        }}
      >
        <Text className="text-2xl font-semibold text-white font-psemibold">
          Sign in!
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

        <Text className="text-xs font-semibold text-white mt-3 text-right mr-2">
          Forgot Passcode
        </Text>

        <CustomButton
          title="Sign In"
          handlePress={() => {}}
          containerStyles="mt-7"
          isLoading={false}
        />
      </View>
    </SafeAreaView>
  );
}
