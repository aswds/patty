import React from "react";
import { Modal, StatusBar, StyleSheet } from "react-native";
import Screen from "./ModalComponents/Screen";

const PartyModal = (props) => {
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
