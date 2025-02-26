import { StateContext } from "@/src/providers/StateContext";
import { Redirect } from "expo-router";
import React from "react";

export default function Index() {
  //return <Redirect href="./(tabs)/today" />;
  //return <Redirect href="/add-drugs" />;
  //return <Redirect href="/update-passcode" />;

  /*
  const { isLogin } = React.useContext(StateContext);

  return !isLogin ? (
    <Redirect href="/(auth)/sign-in" />
  ) : (
    <Redirect href="/(tabs)/today" />
  );
  */
  return <Redirect href="/filter" />;
}
