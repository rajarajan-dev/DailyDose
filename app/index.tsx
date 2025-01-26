import "../global.css";
import { Dimensions, Pressable, View } from "react-native";

import InputBox from "@/src/components/ui/InputBox";
import ViewBackground from "@/src/components/ui/ViewBackground";
import TextBig from "@/src/components/ui/TextBig";
import Button from "@/src/components/ui/Button";
import TextSmall from "@/src/components/ui/TextSmall";
import styles from "./index.styles";
import TextNormal from "@/src/components/ui/TextNormal";

export default function Index() {
  // User Name Input changes
  function onUserNameValueChange(text: string) {
    console.log(text);
  }

  // Login button pressed
  function onHandleLoginPressed() {}

  // sign up link pressed
  function onHandleSignUpPressed() {}

  // Calculate margin top for the login screen based on the screen height
  const { height } = Dimensions.get("screen");
  const tenPercentageHeight = height * 0.1;

  return (
    <ViewBackground style={{ paddingHorizontal: 32 }}>
      <View style={[styles.container, { marginTop: tenPercentageHeight }]}>
        <View
          style={{
            marginVertical: 20,
            alignItems: "center",
          }}
        >
          <TextBig title="Hello!" />
        </View>
        <InputBox
          value=""
          placeholder="User Name"
          style={styles.marginTop16}
          onChangeText={onUserNameValueChange}
        />
        <InputBox
          value=""
          placeholder="Password"
          style={styles.marginTop16}
          onChangeText={onUserNameValueChange}
        />

        <Button
          title="Login"
          onPress={onHandleLoginPressed}
          viewStyle={styles.marginTop32}
        ></Button>

        <TextSmall title="or connect using" style={styles.marginTop32} />
        <View style={styles.connectButtonContainer}>
          <Button title="Google" onPress={onHandleLoginPressed}></Button>
          <Button
            title="Facebook"
            onPress={onHandleLoginPressed}
            viewStyle={{ marginLeft: 50 }}
          ></Button>
        </View>
        <View style={[styles.marginTop32, { flexDirection: "row" }]}>
          <TextSmall title="Don't have an account" />
          <Pressable onPress={onHandleSignUpPressed}>
            <TextNormal
              title="Sign Up"
              style={{
                marginLeft: 10,
                color: "blue",
                textDecorationLine: "underline",
              }}
            />
          </Pressable>
        </View>
      </View>
    </ViewBackground>
  );
}
