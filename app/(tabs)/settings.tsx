import { AppwriteService } from "@/src/appwrite/AppwriteService";
import SupportUs from "@/src/components/ui/SupportUs";
import useSessionCleanup from "@/src/hooks/useSessionCleanup";
import { StateContext } from "@/src/providers/StateContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link, Redirect, router } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";

const SettingsScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const { userId } = useContext(StateContext);
  const { clearSessionAndCredentials, isClearing } = useSessionCleanup();

  useEffect(() => {
    setIsLoading(true);
    AppwriteService.getInstance()
      .getAccount()
      .then((response) => {
        setName(response.name);
        setEmail(response.email);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading || isClearing) {
    return (
      <SafeAreaView className="bg-primary h-full">
        <Text className="text-white font-pmedium text-center mt-2">
          Loading...
        </Text>
      </SafeAreaView>
    );
  }

  const handleLogout = () => {
    clearSessionAndCredentials();
    router.push("/(auth)/sign-in");
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <View className="relative items-center p-4">
        <Text className="text-white text-lg font-bold text-center font-psemibold ">
          Settings
        </Text>
        {/* Logout Icon (Aligned to the Right) */}
        <TouchableOpacity
          onPress={handleLogout}
          className="absolute right-4 top-4"
        >
          <Ionicons name="log-out-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View className="p-2">
        <Text className="text-xl text-gray-400">User Name :</Text>
        <Text className="text-gray-200 text-xl ml-4">{name}</Text>

        <Text className="text-xl text-gray-400 mt-2">Email :</Text>
        <Text className="text-gray-200 text-xl ml-4">{email}</Text>
      </View>
      <View className="bg-gray-500 h-0.5 w-full my-2"></View>

      <Link href="/update-passcode">
        <View className="p-4">
          <Text className="text-secondary text-xl">Update Passcode</Text>
        </View>
      </Link>

      <View className="p-2">
        <SupportUs />
      </View>
      <TouchableOpacity onPress={handleLogout}>
        <View className="p-4">
          <Text className="text-secondary text-xl">Logout</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SettingsScreen;
