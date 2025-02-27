import { Text, SafeAreaView, ActivityIndicator } from "react-native";

const ShowLoadingScreen = () => {
  return (
    <SafeAreaView className="bg-primary flex-1 justify-center items-center">
      <ActivityIndicator size="large" color="#ffffff" />
      <Text className="text-white mt-4">Loading...</Text>
    </SafeAreaView>
  );
};

export default ShowLoadingScreen;
