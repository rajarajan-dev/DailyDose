import { StyleSheet } from "react-native";

const marginTop16 = {
  marginTop: 16,
};

const marginTop32 = {
  marginTop: 32,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  marginTop16: marginTop16,
  marginTop32: marginTop32,
  connectButtonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    ...marginTop32,
  },
});

export default styles;
