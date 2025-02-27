import {
  View,
  Text,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useState } from "react";
import FormField from "@/src/components/ui/FormField";
import CustomButton from "@/src/components/ui/CustomButton";
import { router } from "expo-router";
import { AppwriteService } from "@/src/appwrite/AppwriteService";
import HyperlinkLabel from "@/src/components/ui/HyperlinkLabel";

const Forgot = () => {
  const [email, setEmail] = useState("");

  const handleResetPassword = async () => {
    if (email === "") {
      Alert.alert("Error", "Email is required");
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      Alert.alert("Error", "Invalid email");
      return;
    }

    const promise = AppwriteService.getInstance().createRecovery(
      email,
      "dailydose://reset-password"
    );

    promise.then(
      function (response) {},
      function (error) {}
    );
    Alert.alert(
      "Success",
      "Check your email for reset password, open email from this phone and click on the link to reset password"
    );
  };

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
            Forgot Password?
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
          title="Reset Password"
          handlePress={() => {
            Alert.alert(
              "Forgot Password",
              "This feature is not available yet, please send email to me (rajarajan.abathsagayam@gmail.com) for password reset"
            );
          }}
          containerStyles="mt-7"
          isLoading={false}
        />

        <TouchableOpacity onPress={() => router.back()}>
          <View className="items-end mt-2 mr-1">
            <HyperlinkLabel message="Back to log in" />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Forgot;
