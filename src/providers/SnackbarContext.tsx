import { createContext, ReactNode, useContext, useState } from "react";

export const SnackbarContext = createContext({});

// Define the props for the provider component
type StateProviderProps = {
  children: ReactNode;
};

export const SnackbarProvider = ({ children: StateProviderProps }) => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [duration, setDuration] = useState(3000);

  const showSnackBar = (msg: string, duration = 3000) => {
    setMessage(msg);
    setDuration(duration);
    setVisible(true);
  };
  const hideSnackBar = () => setVisible(false);
  return (
    <SnackbarContext.Provider value={{ showSnackBar, hideSnackBar }}>
      {children}
      <Snackbar visible={visible} onDismiss={hideSnackbar} duration={duration}>
        {message}
      </Snackbar>
    </SnackbarContext.Provider> 
  );
};
