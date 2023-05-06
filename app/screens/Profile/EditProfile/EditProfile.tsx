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
import EditPublicInformation from "./components/EditPublicInformation";
import { EditUser, IUser } from "../../../Types/User";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useActions } from "../../../hooks/useActions";
import { userReference } from "../../../Firebase/References";
import { updateDoc } from "firebase/firestore";
import CustomAlert from "../../../shared/Alert/CustomAlert";
import { uploadImage } from "../../Authorization/Sign_up/Sign_up_screens/Sign_up_Functions/uploadImage";
import { FontFamily } from "../../../../assets/fonts/Fonts";

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
    bio: user?.bio,
    email: user?.email,
  });
  const [userImage, setUserImage] = useState(user?.image);
  const [showAlertModal, setShowAlertModal] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>();

  //Effects
  useEffect(() => {
    setUserInfo({
      ...userInfo,
      bio: route.params.bio ?? userInfo.bio,
      username: route.params.username ?? userInfo.username,
    });
  }, [route.params.bio, route.params.username]);
  //redux
  const { current_user } = useTypedSelector((state) => state.user_state);
  const areChanges: boolean = Boolean(
    userInfo.name !== current_user.name ||
      userInfo.surname !== current_user.surname ||
      userInfo.username !== current_user.username ||
      userInfo.bio !== current_user.bio ||
      userImage !== current_user.image
  );

  //functions
  const onPressSave = async () => {
    // checking if user has changes
    const userRef = userReference(current_user.uid!);
    if (current_user) {
      if (areChanges) {
        const updateUser: Pick<
          IUser,
          "name" | "surname" | "username" | "image" | "bio"
        > = {
          image: userImage,
          name: userInfo.name,
          bio: userInfo.bio,
          surname: userInfo.surname,
          username: userInfo.username,
        };
        {
          console.log(userInfo);
        }
        await updateDoc(userRef, updateUser);
        await uploadImage(userImage);
      }
      navigation.navigate("Profile", {
        current_user: { ...current_user, ...userInfo, image: userImage },
      });
    }
  };

  const onPressNavigationBack = () => {
    if (areChanges) {
      setShowAlertModal(true);
    } else {
      navigation.navigate("Profile", { current_user });
    }
  };
  const handleUserEdit = (editedUser: Partial<EditUser>) => {
    setUserInfo({ ...userInfo, ...editedUser });
  };
  const handleUserImageEdit = (image: string) => {
    setUserImage(image);
  };
  function hideModal() {
    setShowAlertModal(false);
  }
  //renred
  return (
    <ScreenCreateParty
      navigationBar={
        <NavigationBar
          navigation={navigation}
          text="Edit Profile"
          onPress={onPressNavigationBack}
        />
      }
    >
      <View style={styles.imageContainer}>
        <EditImage
          source={user?.image}
          handleUserImageEdit={handleUserImageEdit}
        />
        <Button
          onPress={onPressSave}
          text="Save"
          style={{
            backgroundColor: colors.doneButtonBG,
          }}
          textStyled={{ color: colors.doneButtonText }}
        />
      </View>
      <EditPublicInformation
        user={userInfo}
        handleUserEdit={handleUserEdit}
        setErrorMsg={setErrorMsg}
        setShowAlertModal={setShowAlertModal}
      />
      <CustomAlert
        hideModal={hideModal}
        showModal={showAlertModal}
        title="Discard changes?"
        errorMsg="Your unsaved changes will be lost."
        okButtonText="discard changes"
        okButtonTextStyle={{
          fontFamily: FontFamily.extra_bold,
          color: colors.accentColor,
        }}
        onPressOk={() => navigation.goBack()}
        cancelButtonTextStyle={{
          fontFamily: FontFamily.bold,
          color: colors.text,
        }}
        cancelButtonText="keep editing"
        onPressCancel={hideModal}
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
