import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../../../src/colors";

export default function SignUpContainer(props) {
  const { styles, navigation, textStyle } = props;

  return (
    <View style={styles.registerContainer}>
      <View style={{ width: "100%", height: "100%", alignItems: "center" }}>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            backgroundColor: "rgba(135,15,15,1)",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            width: "30%",
          }}
          onPress={() => {
            navigation.navigate("NameInfo");
          }}
        >
          <Text
            style={{
              ...textStyle.textTermsStyle,
              fontSize: 15,
              color: colors.text,
            }}
          >
            Sign up
          </Text>
          <FontAwesome5 name="arrow-right" size={20} color={"white"} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
