import { StyleSheet } from "react-native";

const marginTop16 = {
  marginTop: 16,
};

const marginTop32 = {
  marginTop: 32,
};

const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  marginTop16: marginTop16,
  marginTop32: marginTop32,
});

export default commonStyles;
