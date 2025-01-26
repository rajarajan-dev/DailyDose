import { StyleSheet } from "react-native";
import commonStyles from "@/src/styles/commonStyles";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },

  connectButtonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    ...commonStyles.marginTop32,
  },
});

export default styles;
