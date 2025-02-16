import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="sign-in"
          options={{
            title: "Sign In",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="sign-up"
          options={{
            title: "Sign Up",
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="forgot"
          options={{
            title: "Forgot",
            headerShown: true,
          }}
        />
      </Stack>
      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
}
