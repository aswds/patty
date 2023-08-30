import React from "react";
import {
  Modal,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
} from "react-native";
import { FontFamily } from "../../../assets/fonts/Fonts";
import Button from "../Buttons/Button";
import { colors } from "../../src/colors";
import AlertButton from "./AlertButton";
import AlertScreen from "./AlertScreen";

interface CustomAlertProps {
  showModal: boolean;
  hideModal: () => void;
  title?: string;
  errorMsg: string;
  okButtonText?: string;
  okButtonTextStyle?: TextStyle;
  onPressOk?: () => void;

  cancelButtonText?: string;
  cancelButtonTextStyle?: TextStyle;

  onPressCancel?: () => void;
}

function AlertTitle({ title }: { title: string }) {
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.titleTextStyle}>{title}</Text>
    </View>
  );
}

const CustomAlert: React.FC<CustomAlertProps> = ({
  showModal,
  hideModal,
  errorMsg,
  okButtonTextStyle,
  okButtonText,
  onPressOk,
  cancelButtonTextStyle,
  cancelButtonText,
  onPressCancel,
  title,
}) => {
  return (
    <AlertScreen hideModal={hideModal} showModal={showModal}>
      <View style={styles.modalContainer}>
        {title && <AlertTitle title={title} />}

        <View style={styles.textContainer}>
          <Text style={styles.textStyle}>{errorMsg}</Text>
        </View>
        <View style={styles.buttonsContainer}>
          <AlertButton
            onPress={onPressOk ?? hideModal}
            style="ok"
            text={okButtonText}
            textStyle={okButtonTextStyle}
          />
          {onPressCancel && cancelButtonText && (
            <AlertButton
              onPress={onPressCancel}
              style="cancel"
              text={cancelButtonText}
              textStyle={cancelButtonTextStyle}
            />
          )}
        </View>
      </View>
    </AlertScreen>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    width: "70%",
    backgroundColor: colors.alertBackground,
    borderRadius: 20,
    zIndex: 1,
  },
  titleContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  titleTextStyle: {
    fontFamily: FontFamily.extra_bold,
    color: colors.text,
    textAlign: "center",
    fontSize: 16,
  },
  buttonsContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  textContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  textStyle: {
    color: "rgba(110,110,110,1)",
    textAlign: "center",
    fontFamily: FontFamily.bold,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
});

export default CustomAlert;
