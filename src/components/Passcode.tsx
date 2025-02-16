import { View, Text, TextInput } from "react-native";
import React from "react";

interface PasscodeProps {
  value: string;
  handleChangeText: (value: string) => void;
  otherStyles?: string;
  textStyles?: string;
}
const Passcode: React.FC<PasscodeProps> = ({
  value,
  handleChangeText,
  otherStyles,
  textStyles,
}) => {
  return (
    <View
      className={`w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary flex flex-row items-center ${otherStyles}`}
    >
      <TextInput
        className={`flex-1 text-white font-psemibold text-base ${textStyles}`}
        value={value}
        placeholderTextColor="#7B7B8B"
        onChangeText={handleChangeText}
        keyboardType={"number-pad"}
      />
    </View>
  );
};

export default Passcode;
