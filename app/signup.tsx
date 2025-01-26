import React, { useState } from "react";
import { View, Text, TextInput } from "react-native";
import styles from "./signup.styles";
import commonStyles from "@/src/styles/commonStyles";
import ViewBackground from "@/src/components/ui/ViewBackground";
import useMarginTop from "@/src/hooks/useMarginTop";
import TextBig from "@/src/components/ui/TextBig";
import InputBox from "@/src/components/ui/InputBox";
import TextSmall from "@/src/components/ui/TextSmall";
import Button from "@/src/components/ui/Button";
import { Link } from "expo-router";
import TextNormal from "@/src/components/ui/TextNormal";

const signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  const handleSignUp = () => {
    // Handle sign up logic here
    console.log("Username:", username);
    console.log("Email:", email);
    console.log("Password:", password);
  };

  const tenPercentageHeight = useMarginTop();

  function onHandleSignupPressed(): void {}

  return (
    <ViewBackground style={{ paddingHorizontal: 32 }}>
      <View style={{ marginTop: tenPercentageHeight }}>
        <View
          style={{
            marginVertical: 20,
            alignItems: "center",
          }}
        >
          <TextBig title="Let's get started!" />
        </View>
        <InputBox
          value=""
          placeholder="User Name"
          style={commonStyles.marginTop16}
        />
        <InputBox
          value=""
          placeholder="Email"
          style={commonStyles.marginTop16}
        />
        <InputBox
          value=""
          placeholder="Phone"
          style={commonStyles.marginTop16}
        />
        <InputBox
          value=""
          placeholder="Password"
          style={commonStyles.marginTop16}
        />
        <InputBox
          value=""
          placeholder="Confirm Password"
          style={commonStyles.marginTop16}
        />

        <Button
          title="Sign Up"
          onPress={onHandleSignupPressed}
          viewStyle={commonStyles.marginTop32}
        ></Button>

        <View style={[commonStyles.marginTop32, { flexDirection: "row" }]}>
          <TextSmall title="Already have an account?" />

          <Link replace href="/" style={{ marginLeft: 5 }}>
            <TextNormal
              title="Login here"
              style={{
                color: "blue",
                textDecorationLine: "underline",
              }}
            />
          </Link>
        </View>
      </View>
    </ViewBackground>
  );
};

export default signup;
