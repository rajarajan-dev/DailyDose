import { useState, useEffect } from "react";
import { Dimensions } from "react-native";

// Custom hook to calculate 10% of the screen height
const useMarginTop = () => {
  const [marginTop, setMarginTop] = useState(0);

  useEffect(() => {
    // Get screen height
    const screenHeight = Dimensions.get("window").height;

    // Calculate 10% of the height
    const tenPercentHeight = screenHeight * 0.1;

    // Set the calculated marginTop
    setMarginTop(tenPercentHeight);
  }, []);

  return marginTop;
};

export default useMarginTop;
