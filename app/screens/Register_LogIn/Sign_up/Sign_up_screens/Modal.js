import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useTheme } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import {
  Dimensions,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Text,
  SafeAreaView,
  Pressable,
} from "react-native";
// import { theme } from "../../../components/theme";
const color = "black";

export const ModalPhoto = (props) => {
  const [image, setImage] = useState();
  const { colors } = useTheme();
  const navigation = useNavigation();
  const styles = makeStyles(colors);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      props.imageHandler(result.uri);
      props.hideModal();
    }
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.showModal}
      style={{ backgroundColor: "transparent" }}
    >
      <TouchableWithoutFeedback
        onPress={props.hideModal}
        style={{ height: "100%", width: "100%" }}
      >
        <View style={{ ...styles.centeredView }}>
          <View
            style={{
              ...styles.modalView,
              justifyContent: "space-around",
              alignItems: "center",
              borderColor: "white",
            }}
          >
            <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
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
                    // props.hideModal();
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      flex: 1,
                    }}
                  >
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
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      flex: 1,
                    }}
                  >
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
const makeStyles = (colors: any) =>
  StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "flex-end",
      alignItems: "center",
    },
    textStyle: {
      fontFamily: "WorkSans-Regular",
      color: color,
    },
    modalView: {
      flexDirection: "column",
      alignItems: "flex-start",
      width: "100%",
      height: Dimensions.get("window").height >= 800 ? "25%" : "40%",
      borderTopRightRadius: 40,

      borderTopLeftRadius: 40,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
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
      height: "27%",
      padding: 10,
      borderColor: true ? "white" : colors.border,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 10,
      backgroundColor: "rgba(250, 250, 250,1)",
      shadowColor: "grey",
      shadowOpacity: 0.5,
      shadowRadius: 4,
      shadowOffset: { width: 1, height: 2 },
    },
  });
