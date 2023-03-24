import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const TermText = () => {
  return (
    <View style={styles.textTerms}>
      <Text style={styles.textTermsStyle}>
        By registering, you confirm that you accept our
      </Text>
      <TouchableOpacity
        onPress={() => {
          {
            /* Fix */
          }
          Alert.alert("Nahui poshel", "Daun ebaniu ", ["Ok"]);
          {
            /* Fix */
          }
        }}
      >
        <Text
          style={{
            ...styles.textTermsStyle,
            color: "cornflowerblue",
          }}
        >
          Terms of service
        </Text>
      </TouchableOpacity>
      <Text style={styles.textTermsStyle}> and </Text>
      <Text style={styles.textTermsStyle}>Private Policy</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  textTerms: {
    width: "90%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  textTermsStyle: {
    fontFamily: "Lato-Regular",
    fontSize: 13,
    fontWeight: "400",
    color: "grey",
  },
  textStyle: {
    fontSize: 15,
    fontWeight: "bold",
  },
});
