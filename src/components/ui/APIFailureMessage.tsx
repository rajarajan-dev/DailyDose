import { Text, SafeAreaView } from "react-native";
import CustomButton from "./CustomButton";
import React from "react";

interface APIFailureMessageProps {
  message: string;
  handlePress: () => void;
}

const APIFailureMessage: React.FC<APIFailureMessageProps> = ({
  message,
  handlePress,
}) => {
  return (
    <SafeAreaView className="bg-primary flex-1 justify-center items-center">
      <Text className="text-white text-lg font-bold text-center">
        Error: {message}
      </Text>
      <CustomButton
        title="Retry"
        containerStyles="bg-secondary py-3 px-6 rounded-lg min-h-[25px] mt-4"
        textStyles="font-pregular text-base"
        handlePress={handlePress}
        isLoading={false}
      />
    </SafeAreaView>
  );
};

export default APIFailureMessage;
