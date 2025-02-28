import { AppwriteService } from "@/src/appwrite/AppwriteService";
import Header from "@/src/components/Header";
import ShowLoadingScreen from "@/src/components/ui/ShowLoadingScreen";
import SupportUs from "@/src/components/ui/SupportUs";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Alert,
  Platform,
  StatusBar,
} from "react-native";

const SettingsScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    try {
      AppwriteService.getInstance()
        .getAccount()
        .then((response) => {
          setName(response.name);
          setEmail(response.email);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
          Alert.alert(
            "Error",
            "Failed to load account details. Please try again later."
          );
        });
    } catch (error) {
      Alert.alert(
        "Error",
        "Failed to load account details. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return <ShowLoadingScreen />;
  }

  return (
    <SafeAreaView
      className="bg-primary h-full"
      style={{
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}
    >
      <Header title="Settings" />

      <View className="p-2">
        <Text className="text-xl text-gray-400">User Name :</Text>
        <Text className="text-gray-200 text-xl ml-4">{name}</Text>
        <Text className="text-xl text-gray-400 mt-2">Email :</Text>
        <Text className="text-gray-200 text-xl ml-4">{email}</Text>
      </View>
      <View className="bg-gray-500 h-0.5 w-full my-2"></View>

      <Link href="/update-password">
        <View className="p-4">
          <Text className="text-secondary text-xl">Update Password</Text>
        </View>
      </Link>

      <View className="p-2">
        <SupportUs />
      </View>
    </SafeAreaView>
  );
};

export default SettingsScreen;
