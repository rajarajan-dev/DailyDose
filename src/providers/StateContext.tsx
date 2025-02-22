// StateContext.tsx
import React, { createContext, useState, ReactNode } from "react";

// Define the shape of the context state
type StateContextType = {
  userId: string;
  isLoading: boolean;
  isLogin: boolean;
  setUserId: (id: string) => void;
  setIsLoading: (loading: boolean) => void;
  setIsLogin: (login: boolean) => void;
};

// Create the context with default values
export const StateContext = createContext<StateContextType>({
  userId: "",
  isLoading: false,
  isLogin: false,
  setUserId: (id: string) => {},
  setIsLoading: (loading: boolean) => {},
  setIsLogin: (login: boolean) => {},
});

// Define the props for the provider component
type StateProviderProps = {
  children: ReactNode;
};

// Create the provider component
export const StateProvider = ({ children }: StateProviderProps) => {
  const [userId, setUserId] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLogin, setIsLogin] = useState<boolean>(false);

  return (
    <StateContext.Provider
      value={{
        userId,
        isLoading,
        isLogin,
        setUserId,
        setIsLoading,
        setIsLogin,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};
