import React, { useCallback, useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  View,
  Platform,
  ScrollView,
  Dimensions,
} from "react-native";
import { colors } from "../../../src/colors";
import Button from "../../../shared/Buttons/Button";
import EditImage from "./components/EditImage";
import { ProfileStackScreenNavigationProps } from "../../../Types/ProfileStack/ScreenNavigationProps";
import NavigationBar from "../../Map/PartyCreationScreens/NavigationBar";
import { ScreenCreateParty } from "../../../shared/Screen/ScreenCreateParty";
import { image } from "../../../../assets/images";
import { Title } from "../../../shared/Title/Title";
import EditPublicInformation from "./components/EditPublicInformation";
import EditUserEmail from "./components/EditUserEmail";
import { EditUser, IUser } from "../../../Types/User";
import { Screen } from "../../../shared/Screen/Screen";
import { getUserByUID } from "../../../services/getUserByUID";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { fetch_user } from "../../../redux/actions/User";
import { useActions } from "../../../hooks/useActions";
import { useFocusEffect } from "@react-navigation/native";
import { userReference } from "../../../Firebase/References";
import { getDoc, updateDoc } from "firebase/firestore";
import CustomAlert from "../../../shared/Alert/CustomAlert";

export default function EditProfile({
  navigation,
  route,
}: ProfileStackScreenNavigationProps<"EditProfile">) {
  //route
  const user = route.params?.current_user;

  //states
  const [userInfo, setUserInfo] = useState({
    name: user?.name,
    surname: user?.surname,
    username: user?.username,
  });
  const [userImage, setUserImage] = useState(user?.image);
  useFocusEffect(
    useCallback(() => {
      fetch_user();
    }, [])
  );
  const [error, setError] = useState<{ username: boolean }>({
    username: false,
  });
  const [showAlertModal, setShowAlertModal] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>();

  //redux
  const { current_user } = useTypedSelector((state) => state.user_state);
  const { fetch_user } = useActions();

  //functions
  const onPress = async () => {
    // checking if user has changes
    const userRef = userReference(user?.uid!);
    console.log("No error: " + !error.username);
    if (!error.username) {
      if (current_user) {
        const { name, surname, username } = userInfo;
        if (
          name !== current_user.name ||
          surname !== current_user.surname ||
          username !== current_user.username ||
          userImage !== current_user.image
        ) {
          const updateUser: Pick<
            IUser,
            "name" | "surname" | "username" | "image"
          > = {
            image: userImage,
            name: userInfo.name,
            surname: userInfo.surname,
            username: userInfo.username,
          };
          updateDoc(userRef, updateUser);
        }
      }
      navigation.navigate("Profile", { current_user });
    }
  };

  const onPressNavigatioBack = () => {
    navigation.navigate("Profile", { current_user });
  };
  const handleUsernameValidation = (isValid: boolean) => {
    setError({ username: isValid });
  };
  const handleUserEdit = (editedUser: EditUser) => {
    setUserInfo(editedUser);
  };
  const handleUserImageEdit = (image: string) => {
    setUserImage(image);
  };

  //renred
  return (
    <ScreenCreateParty>
      <NavigationBar
        navigation={navigation}
        text="Edit Profile"
        onPress={onPressNavigatioBack}
      />

      <View style={styles.imageContainer}>
        <EditImage
          source={user?.image ?? image.noImage}
          handleUserImageEdit={handleUserImageEdit}
        />
        <Button
          onPress={onPress}
          text="Save"
          style={{
            backgroundColor: colors.doneButtonBG,
          }}
          textStyled={{ color: colors.doneButtonText }}
        />
      </View>
      <EditPublicInformation
        user={current_user!}
        handleUserEdit={handleUserEdit}
        handleUsernameValidation={handleUsernameValidation}
        setErrorMsg={setErrorMsg}
        setShowAlertModal={setShowAlertModal}
      />
      <CustomAlert
        hideModal={() => setShowAlertModal(false)}
        showModal={showAlertModal}
        errorMsg={errorMsg!}
      />
    </ScreenCreateParty>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    justifyContent: "space-between",
    alignItems: "flex-end",
    flexDirection: "row",
    marginBottom: "5%",
  },
});
