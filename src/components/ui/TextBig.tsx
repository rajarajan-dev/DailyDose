import React from "react";
import { StyleProp, StyleSheet, Text, TextStyle } from "react-native";

interface TextBigProps {
  title: string;
  style?: StyleProp<TextStyle>;
}

const TextBig: React.FC<TextBigProps> = ({ title, style }) => {
  return <Text style={[styles.text, style]}>{title}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    color: "#000000",
    fontWeight: "bold",
  },
});

export default TextBig;
