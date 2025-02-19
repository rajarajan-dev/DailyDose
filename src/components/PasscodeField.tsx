import { View, Text } from "react-native";
import React, { useState } from "react";
import Passcode from "./ui/Passcode";

interface PasscodeFieldProps {
  title: string;
  otherStyles: string;
  textStyles: string;
}

const PasscodeField: React.FC<PasscodeFieldProps> = ({
  title,
  otherStyles,
  textStyles,
}) => {
  const [passcode, setPasscode] = useState({
    p1: "",
    p2: "",
    p3: "",
    p4: "",
  });
  return (
    <View>
      <Text className="text-base text-gray-100 font-pmedium mt-3 mb-3">
        {title}
      </Text>
      <View className="flex-row justify-evenly pb-5">
        <Passcode
          value={passcode.p1}
          handleChangeText={(value) => {
            setPasscode((prev) => ({
              ...prev,
              p1: value,
            }));
          }}
          otherStyles={otherStyles}
          textStyles={textStyles}
        />
        <Passcode
          value={passcode.p1}
          handleChangeText={(value) => {
            setPasscode((prev) => ({
              ...prev,
              p2: value,
            }));
          }}
          otherStyles={otherStyles}
          textStyles={textStyles}
        />
        <Passcode
          value={passcode.p1}
          handleChangeText={(value) => {
            setPasscode((prev) => ({
              ...prev,
              p3: value,
            }));
          }}
          otherStyles={otherStyles}
          textStyles={textStyles}
        />
        <Passcode
          value={passcode.p1}
          handleChangeText={(value) => {
            setPasscode((prev) => ({
              ...prev,
              p4: value,
            }));
          }}
          otherStyles={otherStyles}
          textStyles={textStyles}
        />
      </View>
    </View>
  );
};

export default PasscodeField;
