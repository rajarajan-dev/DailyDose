import { AppwriteService } from "@/src/appwrite/AppwriteService";
import SupportUs from "@/src/components/ui/SupportUs";
import { StateContext } from "@/src/providers/StateContext";
import { Link, Redirect, router } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const { userId } = useContext(StateContext);

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

  if (isLoading) {
    return (
      <SafeAreaView className="bg-primary h-full">
        <Text className="text-white font-pmedium text-center mt-2">
          Loading...
        </Text>
      </SafeAreaView>
    );
  }

  const handleLogout = () => {
    console.log("UserId " + userId);
    AppwriteService.getInstance().closeSession();
    router.push("/(auth)/sign-in");
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <View className="font-psemibold">
        <Text className="text-white text-lg font-bold text-center">
          Profile
        </Text>
      </View>

      <View className="p-2">
        <Text className="text-2xl text-white">User Name:</Text>
        <Text className="text-white text-xl ml-4">{name}</Text>

        <Text className="text-2xl text-white">Email:</Text>
        <Text className="text-white text-xl ml-4">{email}</Text>
      </View>
      <View className="bg-gray-300 h-0.5 w-full my-2"></View>

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

export default ProfileScreen;
