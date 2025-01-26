import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";

interface ViewBackgroundProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

const ViewBackground: React.FC<ViewBackgroundProps> = ({ children, style }) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#aea6a6", // Customize your background color here
    padding: 10,
  },
});

export default ViewBackground;
