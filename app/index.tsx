import { Button, Text, View } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { useEffect } from "react";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

const webClientId =
  "498533876869-rq782bqg50ptnqq26pvfju3b2n3l8oqu.apps.googleusercontent.com";
const iosClientId =
  "498533876869-aoitc00ig4pi9d77hpnh7d6cn3vmduv3.apps.googleusercontent.com";
const androidClientId =
  "498533876869-k1vrifad45b0rlgd7mrlght7ecu9dmqm.apps.googleusercontent.com";

WebBrowser.maybeCompleteAuthSession();

export default function Index() {
  const googleConfig = {
    webClientId,
    iosClientId,
    androidClientId,
  };

  const [request, response, promptAsync] = Google.useAuthRequest(googleConfig);

  const handleToken = () => {
    // Implement Google sign-in here
    if (response?.type === "success") {
      const { authentication } = response;
      const token = authentication?.accessToken;
      console.log("Access Token:", token);
      getUserInfo(token);
    }
  };

  const getUserInfo = async (token: string) => {
    const userInfoResponse = await fetch(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${token}`
    );
    const userInfo = await userInfoResponse.json();
    console.log("User Info:", userInfo);
  };

  useEffect(() => {
    handleToken();
  }, [response]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Sign in with google.</Text>
      <Button
        title="Sign in with Google"
        onPress={() => promptAsync()}
      ></Button>
    </View>
  );
}
