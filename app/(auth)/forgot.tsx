import {
  View,
  Text,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import FormField from "@/src/components/FormField";
import CustomButton from "@/src/components/CustomButton";
import { router } from "expo-router";

const forgot = () => {
  const [email, setEmail] = useState("");

  return (
    <SafeAreaView className="bg-primary h-full">
      <View
        className="px-4"
        style={{
          marginTop: Dimensions.get("screen").height * 0.2,
        }}
      >
        <View className="items-center">
          <Text className="text-base font-semibold text-white font-psemibold mt-3">
            Forgot Passcode?
          </Text>
        </View>

        <View className="items-center">
          <Text className="text-sm font-semibold text-white font-psemibold">
            No worries, we'll send you reset instructions.
          </Text>
        </View>

        <FormField
          title="Email"
          value={email}
          handleChangeText={(value) => {
            setEmail(value);
          }}
          otherStyles="mt-4"
          keyboardType="email-address"
          placeholder="Email"
        />

        <CustomButton
          title="Reset passcode"
          handlePress={() => {
            router.back();
          }}
          containerStyles="mt-7"
          isLoading={false}
        />

        <TouchableOpacity onPress={() => router.back()}>
          <View className="items-end mt-4 mr-2">
            <Text className="text-base text-white font-psemibold underline">
              Back to log in
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default forgot;
