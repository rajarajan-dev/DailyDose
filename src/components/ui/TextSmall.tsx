import React from "react";
import { StyleProp, StyleSheet, Text, TextStyle } from "react-native";

interface TextSmallProps {
  title: string;
  style?: StyleProp<TextStyle>;
}

const TextSmall: React.FC<TextSmallProps> = ({ title, style }) => {
  return <Text style={[styles.text, style]}>{title}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    color: "#000000",
    fontWeight: "bold",
  },
});

export default TextSmall;
