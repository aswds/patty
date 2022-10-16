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
        <View
          style={{
            flex: 1,
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <View>
            <Text style={styles.title}>Hi! 👋</Text>
            <Text
              style={{
                fontFamily: "WorkSans-Regular",
                fontSize: 17,
                color: colors.text,
              }}
            >
              What's your name?
            </Text>
          </View>
        </View>
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

        <View
          style={{
            alignItems: "flex-end",
            width: "100%",
            height: "5%",
          }}
        >
          <TouchableOpacity
            style={styles.nextButtonContainer}
            onPress={() => {
              navigation.navigate("Avatar", {
                userName: name,
              });
            }}
          >
            <Text style={styles.nextButtonText}>{name ? "Next" : "Skip"}</Text>
            <FontAwesome5 name="arrow-right" size={30} color={colors.text} />
          </TouchableOpacity>
        </View>
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
