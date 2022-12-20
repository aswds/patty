import { FontAwesome5 } from "@expo/vector-icons";
import {
  DarkTheme,
  useNavigation,
  useRoute,
  useTheme,
} from "@react-navigation/native";
import React, { useRef, useState } from "react";
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
import NMAskName from "./components/NameModalComp/NMAskName";
import NMNextButton from "./components/NameModalComp/NMNextButton";
import { NMScreen } from "./components/NameModalComp/NMScreen";
import { text_modifier_name } from "./Sign_up_Functions/text_modifier";
export const NameModal = (props) => {
  const [fullName, setFullName] = useState({ name: null, surname: null });
  const [nameSkip, setNameSkip] = useState();
  const [profileImageSkip, setProfileImageSkip] = useState();
  const navigation = useNavigation();
  const route = useRoute();
  const surname_input_ref = useRef();
  function refHandle(ref_input) {
    ref_input.current.focus();
  }
  return (
    <NMScreen>
      <BackButton navigation={navigation} />
      <View
        style={{
          flex: 1,
          alignItems: "flex-start",
          justifyContent: "center",
        }}
      >
        <View style={{}}>
          <NMAskName styles={styles} />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              width: "100%",
            }}
          >
            <Input isValid={true} style={{ width: "45%" }}>
              <TextInput
                style={styles.textInput}
                placeholder="name"
                placeholderTextColor={colors.iconColor}
                onChangeText={(text) => {
                  setFullName({ ...fullName, name: text_modifier_name(text) });
                }}
                value={fullName.name}
                onSubmitEditing={() => {
                  refHandle(surname_input_ref);
                }}
                autoCorrect={false}
              />
            </Input>
            <Input isValid={true} style={{ width: "45%" }}>
              <TextInput
                style={styles.textInput}
                placeholder="surname"
                placeholderTextColor={colors.iconColor}
                onChangeText={(text) => {
                  setFullName({
                    ...fullName,
                    surname: text_modifier_name(text),
                  });
                }}
                value={fullName.surname}
                ref={surname_input_ref}
                autoCorrect={false}
              />
            </Input>
          </View>
        </View>
        <NMNextButton
          navigation={navigation}
          styles={styles}
          name={fullName.name}
          surname={fullName.surname}
        />
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
    fontFamily: "WorkSans-Bold",
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
