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
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { BackButton } from "./components/BackButton";
import NMAskName from "./components/NMAskName";
import NMNextButton from "./components/NMNextButton";
import { NMScreen } from "./components/NMScreen";
export const NameModal = (props) => {
  const [name, setName] = useState();
  const [nameSkip, setNameSkip] = useState();
  const [profileImageSkip, setProfileImageSkip] = useState();
  const { colors } = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const styles = makeStyles(colors);
  return (
    <NMScreen>
      <BackButton navigation={navigation} />
      <View
        style={{
          flex: 1,
          justifyContent: "space-evenly",
          marginHorizontal: 10,
        }}
      >
        <NMAskName styles={styles} />

        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "flex-start",
          }}
        >
          <TextInput
            style={styles.textInput}
            placeholder="🥸 Enter your name"
            placeholderTextColor={"grey"}
            onChangeText={(text) => {
              setName(text);
            }}
            value={name}
          />
        </View>

        <NMNextButton navigation={navigation} styles={styles} name={name} />
      </View>
    </NMScreen>
  );
};
const makeStyles = (colors: any) =>
  StyleSheet.create({
    title: {
      fontFamily: "WorkSans-Bold",
      fontSize: 35,
      color: colors.text,
    },
    textInput: {
      borderRadius: 10,
      borderBottomWidth: 3,
      borderBottomColor: colors.text,
      fontFamily: "WorkSans-Regular",
      paddingVertical: "5%",
      paddingHorizontal: 10,
      width: "100%",
    },
    nextButtonContainer: {
      width: "40%",
      bottom: 10,
      alignSelf: "center",
      alignItems: "center",
      justifyContent: "space-evenly",
      flexDirection: "row",
    },
    nextButtonText: {
      fontWeight: "bold",
      color: colors.text,
    },
    container: {
      flex: 1,
    },
  });
