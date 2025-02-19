import { icons } from "@/src/constants";
import React from "react";
import { View, Text, Image, TouchableOpacity, Linking } from "react-native";

const SupportUs = () => {
  const upiLink =
    "upi://pay?pa=your-upi-id@okhdfcbank&pn=YourName&mc=0000&mode=02&purpose=00";

  const handleSupportPress = () => {
    Linking.openURL(upiLink).catch((err) =>
      console.error("Error opening link", err)
    );
  };

  return (
    <View className="flex items-center p-5 bg-white rounded-xl shadow-md">
      <Text className="text-xl font-bold text-gray-900 mb-2">Support Us</Text>
      <Text className="text-center text-gray-600 mb-4">
        If you find this app helpful, you can support us with a small donation.
        Your support helps keep the app free and improving!
      </Text>

      {/* QR Code (Replace with actual QR image) */}
      <Image source={icons.gpayScanner} className="w-40 h-40 mb-4" />

      <TouchableOpacity
        className="bg-blue-600 px-4 py-2 rounded-lg"
        onPress={handleSupportPress}
      >
        <Text className="text-white font-semibold">Support via GPay</Text>
      </TouchableOpacity>

      <Text className="text-xs text-gray-500 mt-4">
        *This is a voluntary contribution. No additional services or features
        are provided in exchange.*
      </Text>
    </View>
  );
};

export default SupportUs;
