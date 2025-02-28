import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import useSessionCleanup from "../hooks/useSessionCleanup";
import { router } from "expo-router";

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const { clearSessionAndCredentials, isClearing } = useSessionCleanup();
  return (
    <View className="relative items-center p-4">
      <Text className="text-white text-lg font-bold text-center font-psemibold ">
        {title}
      </Text>
      {/* Logout Icon (Aligned to the Right) */}
      <TouchableOpacity
        onPress={() => {
          clearSessionAndCredentials();
          router.replace("/(auth)/sign-in");
        }}
        className="absolute right-4 top-4"
      >
        {isClearing || (
          <Ionicons name="log-out-outline" size={24} color="white" />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Header;
