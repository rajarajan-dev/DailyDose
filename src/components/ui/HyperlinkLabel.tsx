import { Text } from "react-native";
import React from "react";
interface HyperlinkLabelProp {
  message: string;
}
const HyperlinkLabel: React.FC<HyperlinkLabelProp> = ({ message }) => {
  return (
    <Text className="text-sm font-semibold mt-7 text-right mr-2 underline text-secondary-100">
      {message}
    </Text>
  );
};

export default HyperlinkLabel;
