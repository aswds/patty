import React, { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Screen from "./components/Screen";
import { colors } from "../../src/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { auth } from "../../../firebase";
import { sendEmailVerification } from "firebase/auth";
import { useNavigation, useRoute } from "@react-navigation/native";
import Button from "../Register_LogIn/components/button";

function Title() {
  return (
    <View style={styles.titleContainer}>
      <MaterialIcons
        name="mark-email-read"
        size={128}
        color={colors.accentColor}
      />

      <Text
        style={{
          fontSize: 25,
          alignSelf: "center",
          color: colors.iconColor,
          fontFamily: "WorkSans-Bold",
        }}
      >
        Verify email
      </Text>
    </View>
  );
}
function MainText({ email, text }) {
  return (
    <View style={styles.mainTextContainer}>
      <Text
        style={{
          fontSize: 16,
          alignSelf: "center",
          color: colors.iconColor,
          fontFamily: "WorkSans-Regular",
          textAlign: "center",
        }}
      >
        {text}
        <Text style={{ fontFamily: "WorkSans-Bold", marginVertical: 5 }}>
          {email}
        </Text>
      </Text>
    </View>
  );
}
function ChangeEmailText() {
  const navigation = useNavigation();
  return (
    <View style={styles.textTerms}>
      <Text style={styles.textTermsStyle}>
        Did not receive the email? Check your spam filter, or
      </Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("ChangeEmail");
        }}
      >
        <Text
          style={{
            ...styles.textTermsStyle,
            fontFamily: "WorkSans-Medium",
            color: colors.accentColor,
          }}
        >
          try another email address.
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const VerifyEmail = (props) => {
  const route = useRoute();
  const [verification, setVerification] = useState({
    text: "Sending a verification letter...\n",
    emailWasSent: false,
  });
  const [sendEmailVerificationAgain, setSendEmailVerificationAgain] =
    useState(false);
  const [canSend, setCanSend] = useState(true);
  function sendVerification() {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        setVerification({
          emailWasSent: true,
          text: "We have sent an verification email to ",
        });
      })
      .catch((e) => {
        setVerification({
          emailWasSent: false,
          text: "Error occurred, please try again.\n",
        });
      });
  }
  function SendVerificationAgain() {
    function sendVerificationLetter() {
      if (canSend) {
        sendVerification();
        setCanSend(false);
        setTimeout(() => {
          setCanSend(true);
        }, 10000);
      } else {
        Alert.alert("Can`t send an email");
      }
    }
    return (
      <Button
        style={{
          backgroundColor: canSend ? colors.accentColor : colors.disabledButton,
        }}
        onPress={sendVerificationLetter}
      >
        Send again
      </Button>
    );
  }
  function EmailVerified() {
    return (
      <Button
        onPress={() => {
          auth.currentUser.reload();
        }}
        style={{ marginBottom: 20 }}
      >
        I've verified email
      </Button>
    );
  }

  useEffect(() => {
    if (!auth.currentUser?.emailVerified && !verification.emailWasSent) {
      sendVerification();
    }
  }, [route.params?.changedEmail, sendEmailVerificationAgain]);
  const email = auth.currentUser?.email;
  return (
    <Screen>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <Title />
          <MainText
            email={
              email && !route.params?.changedEmail
                ? email
                : route.params?.changedEmail
            }
            text={verification.text}
          />
        </View>
        <View style={styles.buttonsContainer}>
          <EmailVerified />
          <SendVerificationAgain />
        </View>

        <ChangeEmailText />
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  buttonsContainer: { alignItems: "center", justifyContent: "space-around" },
  titleContainer: { alignItems: "center" },
  mainTextContainer: {
    marginTop: "15%",
    padding: 25,
    borderRadius: 25,
    width: "80%",
    alignItems: "center",
    alignSelf: "center",
  },
  textStyle: {
    color: colors.buttonTextColor,
    fontSize: 17,
    fontFamily: "WorkSans-Bold",
  },
  textTerms: {
    height: "10%",
    marginTop: "10%",
    alignSelf: "center",
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
});
export default VerifyEmail;
