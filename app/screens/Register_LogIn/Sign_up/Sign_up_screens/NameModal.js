import { FontAwesome5 } from "@expo/vector-icons";
import {
  DarkTheme,
  useNavigation,
  useRoute,
  useTheme,
} from "@react-navigation/native";
import React, { useState } from "react";
import {
  Dimensions,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { colors } from "../../../../src/colors";
import { Input } from "../../components/Input";
import { BackButton } from "../../components/BackButton";
import NMAskName from "./components/NMAskName";
import NMNextButton from "./components/NMNextButton";
import { NMScreen } from "./components/NMScreen";
export const NameModal = (props) => {
  const [name, setName] = useState();
  const [nameSkip, setNameSkip] = useState();
  const [profileImageSkip, setProfileImageSkip] = useState();
  const navigation = useNavigation();
  const route = useRoute();
  return (
    <NMScreen>
      <BackButton navigation={navigation} />
      <View
        style={{
          flex: 1,
          alignItems: "flex-start",
          justifyContent: "center",
          marginHorizontal: 10,
        }}
      >
        <View style={{ marginHorizontal: 10 }}>
          <NMAskName styles={styles} />

          <View style={{}}>
            <Input isValid={true} style={{ width: "100%" }}>
              <TextInput
                style={styles.textInput}
                placeholder="🥸 Enter your name"
                placeholderTextColor={colors.iconColor}
                onChangeText={(text) => {
                  setName(text);
                }}
                value={name}
              />
            </Input>
          </View>
        </View>

        <NMNextButton navigation={navigation} styles={styles} name={name} />
      </View>
    </NMScreen>
  );
};
const styles = StyleSheet.create({
  title: {
    fontFamily: "WorkSans-Bold",
    fontSize: 35,
    color: colors.buttonTextColor,
  },
  textInput: {
    borderBottomColor: colors.iconColor,
    fontFamily: "WorkSans-Regular",
    paddingVertical: "5%",
    paddingHorizontal: 10,
    width: "100%",
    color: colors.text,
  },
  nextButtonContainer: {
    width: "40%",
    position: "absolute",
    bottom: 10,
    right: 0,
    alignSelf: "flex-end",
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",
    backgroundColor: colors.accentColor,
    padding: 10,
    borderRadius: 40,
  },
  nextButtonText: {
    fontWeight: "bold",
    color: colors.buttonTextColor,
  },
  container: {
    flex: 1,
  },
});
