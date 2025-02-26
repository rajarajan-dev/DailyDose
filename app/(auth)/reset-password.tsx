import React, { useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { AppwriteService } from "@/src/appwrite/AppwriteService";

const ResetPassword: React.FC = () => {
  const { userId, secret } = useLocalSearchParams<{
    userId: string;
    secret: string;
  }>();
  const [newPassword, setNewPassword] = useState("");

  const handleResetPassword = async () => {
    try {
      const promise = AppwriteService.getInstance().updateRecovery(
        userId,
        secret,
        newPassword
      );

      promise.then(
        function (response) {},
        function (error) {}
      );

      Alert.alert("Success", "Your password has been reset.");
    } catch (error) {
      Alert.alert("Error", error);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="New Password"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
        style={{
          marginBottom: 10,
          padding: 10,
          borderWidth: 1,
          borderColor: "#ccc",
        }}
      />
      <Button title="Reset Password" onPress={handleResetPassword} />
    </View>
  );
};

export default ResetPassword;
