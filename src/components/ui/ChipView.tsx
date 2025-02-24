import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

interface ChipViewProps {
  label: string;
  layoutStyle: string;
  textStyle: string;
  isSelected: boolean;
  onPress: () => void;
}

const ChipView: React.FC<ChipViewProps> = ({
  label,
  layoutStyle,
  textStyle,
  isSelected = false,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        className={`items-center justify-center h-12 ${
          isSelected ? "bg-orange-400" : "bg-gray-400"
        }   rounded-2xl border-2 border-black-200 px-3 ${layoutStyle}`}
      >
        <Text
          className={` ${
            isSelected ? "text-black" : "text-slate-100"
          } font-pregular text-base ${textStyle}`}
        >
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChipView;
