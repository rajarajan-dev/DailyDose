import { Redirect } from "expo-router";

export default function Index() {
  //return <Redirect href="./(tabs)/today" />;
  //return <Redirect href="/add-drugs" />;
  //return <Redirect href="/update-passcode" />;
  return <Redirect href="/(auth)/sign-in" />;
}
