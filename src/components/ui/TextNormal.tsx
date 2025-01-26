import React from "react";
import { StyleProp, StyleSheet, Text, TextStyle } from "react-native";

interface TextNormalProps {
  title: string;
  style?: StyleProp<TextStyle>;
}

const TextNormal: React.FC<TextNormalProps> = ({ title, style }) => {
  return <Text style={[styles.text, style]}>{title}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    color: "#000000",
    fontWeight: "bold",
  },
});

export default TextNormal;
