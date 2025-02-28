import { Text } from "react-native";
import React from "react";

interface ErrorMessageProps {
  message: string;
}
const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return <Text className="text-red-500 mt-2">{message}</Text>;
};

export default ErrorMessage;
