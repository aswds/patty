import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import {
  Dimensions,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { colors } from "../../../../src/colors";
import { FontFamily } from "../../../../../assets/fonts/Fonts";

const color = colors.background;
export const ModalPhoto = (props) => {
  const styles = makeStyles(colors);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      props.imageHandler(result.assets[0].uri);
      props.hideModal();
    }
  };
  return (
    <Modal animationType="slide" transparent={true} visible={props.showModal}>
      <TouchableWithoutFeedback
        onPress={props.hideModal}
        style={{
          height: "100%",
          width: "100%",
        }}
      >
        <View style={{ ...styles.centeredView }}>
          <View
            style={{
              ...styles.modalView,
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <SafeAreaView
              style={{
                flex: 1,
                width: "100%",
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "space-evenly",
                }}
              >
                <TouchableOpacity
                  style={styles.modalButtonsStyle}
                  onPress={() => {
                    pickImage();
                    props.hideModal();
                  }}
                >
                  <View style={styles.iconContainer}>
                    <MaterialIcons
                      name="insert-photo"
                      size={30}
                      color={color}
                      style={{ paddingHorizontal: 10 }}
                    />
                    <Text style={styles.textStyle}>Pick a picture</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalButtonsStyle}
                  onPress={props.hideModal}
                >
                  <View style={styles.iconContainer}>
                    <MaterialIcons
                      name="close"
                      size={30}
                      color={color}
                      style={{ paddingHorizontal: 10 }}
                    />
                    <Text style={styles.textStyle}>Close</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </SafeAreaView>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
const makeStyles = (colors) =>
  StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "flex-end",
      alignItems: "center",
    },
    iconContainer: {
      flexDirection: "row",
      alignItems: "center",
      flex: 1,
    },
    textStyle: {
      fontFamily: FontFamily.bold,
      color: colors.background,
    },
    modalView: {
      flexDirection: "column",
      alignItems: "flex-start",
      width: "100%",
      height: Dimensions.get("window").height >= 800 ? "25%" : "40%",
      borderTopRightRadius: 40,

      borderTopLeftRadius: 40,

      shadowOpacity: 0,
    },

    whiteButtonContainer: {
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      marginVertical: 20,
    },
    modalButtonsStyle: {
      flexDirection: "row",
      width: Dimensions.get("window").width * 0.7,
      height: "23%",
      padding: 10,
      borderColor: true ? "white" : colors.border,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 10,
      backgroundColor: colors.buttonTextColor,
      // backgroundColor:
      //   Platform.OS == "ios"
      //     ? "rgba(250, 250, 250,1)"
      //     : "rgba(230, 230, 230,1)",
      shadowColor: "grey",
      shadowOpacity: 0.5,
      shadowRadius: 4,
      shadowOffset: { width: 1, height: 2 },
    },
  });
