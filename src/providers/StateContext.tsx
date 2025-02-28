// StateContext.tsx
import React, { createContext, useState, ReactNode } from "react";

// Define the shape of the context state
type StateContextType = {
  isLogin: boolean;
  setIsLogin: (login: boolean) => void;
};

// Create the context with default values
export const StateContext = createContext<StateContextType>({
  isLogin: false,
  setIsLogin: (login: boolean) => {},
});

// Define the props for the provider component
type StateProviderProps = {
  children: ReactNode;
};

// Create the provider component
export const StateProvider = ({ children }: StateProviderProps) => {
  const [isLogin, setIsLogin] = useState<boolean>(false);

  return (
    <StateContext.Provider
      value={{
        isLogin,
        setIsLogin,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};
