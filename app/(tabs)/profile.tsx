import SupportUs from "@/src/components/ui/SupportUs";
import { Link, Redirect } from "expo-router";
import { View, Text, SafeAreaView } from "react-native";

const ProfileScreen = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
      <View className="font-psemibold">
        <Text className="text-white text-lg font-bold text-center">
          Profile
        </Text>
      </View>

      <View className="p-2">
        <Text className="text-2xl text-white">User Name:</Text>
        <Text className="text-white text-xl ml-4">John Doe</Text>

        <Text className="text-2xl text-white">Email:</Text>
        <Text className="text-white text-xl ml-4">john.doe@example.com</Text>
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
      <Link href="/(auth)/sign-in">
        <View className="p-4">
          <Text className="text-secondary text-xl">Logout</Text>
        </View>
      </Link>
    </SafeAreaView>
  );
};

export default ProfileScreen;
