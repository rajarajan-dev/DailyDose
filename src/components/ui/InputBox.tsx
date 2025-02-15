import React from "react";
import "../../../global.css";
import {
  TextInput,
  StyleSheet,
  TextInputProps,
  StyleProp,
  TextStyle,
} from "react-native";

interface InputBoxProps extends TextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  style: StyleProp<TextStyle>;
}

const InputBox: React.FC<InputBoxProps> = ({
  value,
  onChangeText,
  placeholder,
  style,
  ...rest
}) => {
  return (
    <TextInput
      className="p-2 bg-white"
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      {...rest}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    padding: 10,
    fontSize: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#ccc",
    width: "100%",
    backgroundColor: "#ffffff",
    boxSizing: "border-box",
    borderCurve: "circular",
  },
});

export default InputBox;
