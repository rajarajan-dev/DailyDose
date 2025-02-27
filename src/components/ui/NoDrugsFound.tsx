import { Text, SafeAreaView } from "react-native";
import CustomButton from "./CustomButton";
import React from "react";

interface NoDrugsFoundProps {
  title: string;
  subTitle: string;
  handlePress: () => void;
}
const NoDrugsFound: React.FC<NoDrugsFoundProps> = ({
  title,
  subTitle,
  handlePress,
}) => {
  return (
    <SafeAreaView className="bg-primary flex-1 justify-center items-center">
      <Text className="text-white text-lg font-bold text-center">{title}</Text>
      <Text className="text-white text-center mt-2">{subTitle}</Text>
      <CustomButton
        title="Add Drug"
        containerStyles="bg-secondary py-1 px-5 rounded-lg mt-4"
        textStyles="font-pregular text-base"
        handlePress={handlePress}
        isLoading={false}
      />
    </SafeAreaView>
  );
};

export default NoDrugsFound;
