import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
export default function SignUpContainer(props) {
  const { styles, navigation, textStyle } = props;

  return (
    <View style={styles.registerContainer}>
      <View style={textStyle.textTerms}>
        <Text style={textStyle.textTermsStyle}>New user?{"  "}</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("NameInfo");
          }}
        >
          <Text
            style={{
              ...textStyle.textTermsStyle,
              fontSize: 15,
              color: "#416194",
            }}
          >
            Sign up
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
