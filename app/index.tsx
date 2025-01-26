import InputBox from "@/src/components/ui/InputBox";
import ViewBackground from "@/src/components/ui/ViewBackground";
import TextBig from "@/src/components/ui/TextBig";
import Button from "@/src/components/ui/Button";
import TextSmall from "@/src/components/ui/TextSmall";
import styles from "./index.styles";
import TextNormal from "@/src/components/ui/TextNormal";
import { Link } from "expo-router";
import useMarginTop from "@/src/hooks/useMarginTop";
import { View } from "react-native";
import commonStyles from "@/src/styles/commonStyles";

export default function Index() {
  // User Name Input changes
  function onUserNameValueChange(text: string) {
    console.log(text);
  }

  // Login button pressed
  function onHandleLoginPressed() {}

  const tenPercentageHeight = useMarginTop();

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
          style={commonStyles.marginTop16}
          onChangeText={onUserNameValueChange}
        />
        <InputBox
          value=""
          placeholder="Password"
          style={commonStyles.marginTop16}
          onChangeText={onUserNameValueChange}
        />

        <Button
          title="Login"
          onPress={onHandleLoginPressed}
          viewStyle={commonStyles.marginTop32}
        ></Button>

        <TextSmall title="or connect using" style={commonStyles.marginTop32} />
        <View style={styles.connectButtonContainer}>
          <Button title="Google" onPress={onHandleLoginPressed}></Button>
          <Button
            title="Facebook"
            onPress={onHandleLoginPressed}
            viewStyle={{ marginLeft: 50 }}
          ></Button>
        </View>
        <View style={[commonStyles.marginTop32, { flexDirection: "row" }]}>
          <TextSmall title="Don't have an account?" />

          <Link href="/signup" style={{ marginLeft: 5 }}>
            <TextNormal
              title="Sign Up"
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
}
