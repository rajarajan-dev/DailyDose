import { useState } from "react";
import * as SecureStore from "expo-secure-store";
import { AppwriteService } from "../appwrite/AppwriteService";
import React from "react";
import { StateContext } from "../providers/StateContext";

const useSessionCleanup = () => {
  const { isLoading, setIsLogin, setIsLoading, setUserId } =
    React.useContext(StateContext);

  const [isClearing, setIsClearing] = useState(false);

  const clearSessionAndCredentials = async () => {
    setIsClearing(true);

    try {
      // Clear the Appwrite session
      const sessionId = await SecureStore.getItemAsync("sessionid");
      await AppwriteService.getInstance().closeSession(sessionId || "");

      await SecureStore.deleteItemAsync("sessionid");
    } catch (error) {
      console.error("Error clearing session and credentials:", error);
    } finally {
      setIsClearing(false);
    }
  };

  return { clearSessionAndCredentials, isClearing };
};

export default useSessionCleanup;
