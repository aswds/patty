import { FontAwesome } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  Animated,
  Dimensions,
  TouchableOpacity,
  PanResponder,
  SafeAreaView,
  Image,
  StatusBar,
  Easing,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "../../../src/colors";
import { animationStart } from "./ModalComponents/animations";
import { CloseButton } from "./ModalComponents/CloseButton";
import Screen from "./ModalComponents/Screen";
const PartyModal = (props) => {
  const [userCanScroll, setUserCanScroll] = useState(true);

  const iconSize = Dimensions.get("window").width * 0.1;
  const styles = makeStyle(colors);
  const navigation = useNavigation();
  function closeModal() {
    setIsAnimationRan(false), props.hideModal();
    setAnimation(new Animated.Value(0));
    setAnimationBorder(new Animated.Value(0));
  }

  const insets = useSafeAreaInsets();

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.showModal}
      onRequestClose={props.hideModal}
    >
      <StatusBar barStyle={"light-content"} />
      <Screen hideModal={props.hideModal}></Screen>
    </Modal>
  );
};

const makeStyle = (colors) => {
  return StyleSheet.create({
    headerContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
    },
    titleContainer: {
      maxWidth: "75%",
      marginVertical: "5%",
      marginLeft: "5%",
    },
    title: {
      fontFamily: "WorkSans-Bold",
      color: "white",
      fontSize: 24,
    },
    textStyle: {
      color: colors.text,
      fontFamily: "WorkSans-Regular",
      fontSize: 14,
    },
    iconStyle: {
      alignItems: "center",
      width: 250,
      height: 40,
      justifyContent: "center",
      padding: 10,
    },

    iconText: { fontWeight: "bold", color: "white" },
    containerSafeArea: {
      flex: 1,
      backgroundColor: "black",
    },
    mapStyle: {
      borderRadius: 10,
      borderWidth: 2,
    },
    locationTitleStyle: {
      flexDirection: "row",
      alignItems: "center",
    },
    locationText: {
      fontSize: 15,
      color: colors.text,
      fontFamily: "WorkSans-Bold",
      maxWidth: "85%",
      alignItems: "flex-start",
    },
  });
};

export default PartyModal;
