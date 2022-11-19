import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { animationStart } from "./ModalComponents/animations";
const PostModal = (props) => {
  const { data } = props;

  const [animation, setAnimation] = useState(new Animated.Value(0));
  const [animationBorder, setAnimationBorder] = useState(new Animated.Value(0));
  const [isAnimationRan, setIsAnimationRan] = useState(false);
  const [userCanScroll, setUserCanScroll] = useState(true);

  const iconSize = Dimensions.get("window").width * 0.1;
  const styles = makeStyle();
  const navigation = useNavigation();
  function closeModal() {
    setIsAnimationRan(false), props.hideModal();
    setAnimation(new Animated.Value(0));
    setAnimationBorder(new Animated.Value(0));
  }
  const modalHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["85%", "100%"],
  });
  const modalBorderRad = animationBorder.interpolate({
    inputRange: [0, 1],
    outputRange: [40, 0],
  });
  const modalStyle = {
    height: modalHeight,
    borderTopLeftRadius: modalBorderRad,
    borderTopRightRadius: modalBorderRad,
  };
  const insets = useSafeAreaInsets();

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.showModal}
      onRequestClose={props.hideModal}
    >
      <StatusBar barStyle={"light-content"} />

      <View style={styles.centeredView}>
        <Animated.View
          style={{
            ...modalStyle,
            ...styles.modalView,
          }}
        >
          <View style={styles.scrollViewContainer}>
            <ScrollView
              onScroll={() => animationStart(isAnimationRan, setIsAnimationRan)}
              onTouchMove={() => {
                animationStart(isAnimationRan, setIsAnimationRan);
              }}
              style={styles.scrollViewContainer}
              scrollEventThrottle={1}
              contentContainerStyle={{
                paddingTop: insets.top,
                paddingBottom: insets.bottom,
              }}
              showsVerticalScrollIndicator={false}
            ></ScrollView>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const makeStyle = () => {
  return StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "flex-end",

      alignItems: "center",
    },
    modalView: {
      justifyContent: "space-around",
      alignItems: "center",
      flexDirection: "row",
      width: "100%",
      backgroundColor: "#1D1D1D",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowColor: "white",
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    scrollViewContainer: { flex: 1 },
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
      color: "white",
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
      color: "white",
      fontFamily: "WorkSans-Bold",
      maxWidth: "85%",
      alignItems: "flex-start",
    },
  });
};

export default PostModal;
