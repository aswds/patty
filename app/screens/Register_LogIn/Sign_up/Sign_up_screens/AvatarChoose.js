import { FontAwesome5 } from "@expo/vector-icons";
import {
  DarkTheme,
  useNavigation,
  useRoute,
  useTheme,
} from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import {
  Image,
  ImageBackground,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  ScrollView,
} from "react-native";
import { ACScreen } from "./components/ACScreen";
import { BackButton } from "./components/BackButton";
import { ModalPhoto } from "./Modal";
export const AvatarChoose = (props) => {
  const route = useRoute();

  const _hideModal = () => {
    setShowModal(false);
  };
  const _imagePropHandler = (imageProp) => {
    setImage(imageProp);
  };
  const _showModalHandle = () => {
    setShowModal(true);
  };
  useEffect(() => {
    setImage(route.params?.imageURI);
  }, [route.params?.imageURI]);
  const imageParam = route.params?.imageURI;
  const { colors } = useTheme();
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState(imageParam);
  const navigation = useNavigation();
  const styles = makeStyles(colors);
  const name = route.params?.name;

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);
  // not safe to pass params in  3 screens (change to (registration->firebase.createNewUser->enter name -> choose avatar -> updateProfile -> Home screen))
  return (
    <ACScreen>
      <BackButton navigation={navigation} />
      <StatusBar barStyle={DarkTheme.dark ? "light-content" : "dark-content"} />

      <TouchableOpacity
        style={{
          height: 200,
          width: 200,
          borderRadius: 100,
          borderWidth: 3,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={_showModalHandle}
      >
        {image ? (
          <Image
            source={{ uri: image }}
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 100,
              justifyContent: "center",
              alignItems: "center",
            }}
          />
        ) : (
          <Text style={{ fontSize: 100 }}>🤔</Text>
        )}
      </TouchableOpacity>

      <View style={{ maxWidth: "99%" }}>
        <Text style={styles.title}>Hi {route.params?.userName}!</Text>
        <Text style={styles.textStyle}>It's time to choose your avatar!</Text>
      </View>

      <ModalPhoto
        routeName={route.name}
        hideModal={_hideModal}
        showModal={showModal}
        imageHandler={_imagePropHandler}
      />

      <TouchableOpacity
        style={styles.nextButtonContainer}
        onPress={() => {
          navigation.navigate("SignUpScreen", {
            userName: name,
          });
        }}
      >
        <Text style={styles.nextButtonText}>{name ? "Next" : "Skip"}</Text>
        <FontAwesome5 name="arrow-right" size={30} color={colors.text} />
      </TouchableOpacity>
    </ACScreen>
  );
};
const makeStyles = (colors: any) =>
  StyleSheet.create({
    title: {
      fontFamily: "WorkSans-Bold",
      fontSize: 20,
      color: colors.text,
    },
    textStyle: {
      fontFamily: "WorkSans-Regular",
      fontSize: 20,
      color: colors.text,
    },
    container: {
      flex: 1,
    },
    nextButtonContainer: {
      width: "40%",
      alignSelf: "center",
      alignItems: "center",
      justifyContent: "space-evenly",
      flexDirection: "row",
    },
    nextButtonText: {
      fontWeight: "bold",
      color: colors.text,
    },
  });
