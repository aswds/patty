import { Button, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Title } from "../../../../shared/Title/Title";
import { colors } from "../../../../src/colors";
import CustomAlert from "../../../../shared/Alert/CustomAlert";
import { ReauthModal } from "../../../../shared/Alert/ReauthModal";
import {
  User,
  getAuth,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import { auth } from "../../../../../firebase";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import { deleteParty } from "../../../Modals/PartyModal/components/actionButtonsFunctions";
import { leaveEvent } from "../../../Map/Firebase/eventFunctions";
import Loader from "../../../../shared/Loaders/Loader";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";

const DeleteUserAccount = () => {
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const [showReauthModal, setShowReauthModal] = useState(false);
  const [reauthError, setReauthError] = useState<string>();
  const { current_user: userInfo } = useTypedSelector(
    (state) => state.user_state
  );
  function hideModal() {
    setShowAlert(false);
  }
  async function handleReauth(pass: string) {
    const currentUser: User | null = getAuth().currentUser;

    if (currentUser) {
      const credential = EmailAuthProvider.credential(currentUser.email, pass);
      setShowLoader(true);
      await reauthenticateWithCredential(currentUser, credential)
        .then(async () => {
          // Refresh the auth token after reauthentication
          await currentUser.getIdToken(true);
          if (userInfo.events.onEvent === userInfo.uid) {
            await deleteParty(
              userInfo.events.onEvent,
              userInfo.userLocation?.partyLocation,
              userInfo.events.eventType
            );
          } else {
            const data = {
              partyLocation: userInfo.userLocation?.partyLocation,
              party_access: userInfo.events.eventType,
              partyID: userInfo.events.onEvent,
            };
            await leaveEvent(data);
          }
          // Proceed with email change
          await auth.currentUser?.delete();
        })
        .catch((e) => {
          if (e.code === "auth/wrong-password") {
            setReauthError("Wrong password");
          } else {
            setReauthError("Something went wrong...");
          }
        })
        .finally(() => {
          setShowLoader(false);
        });
    }
  }
  return (
    <View style={{ width: "100%" }}>
      <Loader isVisible={showLoader} />
      <Title
        title="Danger Zone"
        icon={
          <MaterialCommunityIcons
            name="alert-rhombus-outline"
            size={28}
            style={{ marginLeft: "5%" }}
            color={colors.accentColor}
          />
        }
      />
      <Button
        title="Delete Account"
        color={colors.buttonText}
        onPress={() => setShowAlert(true)}
      />
      <View>
        <CustomAlert
          errorMsg="Deleting your account is irreversible. All your data will be permanently lost. Proceed only if you are absolutely sure about this decision."
          title="Delete Account"
          showModal={showAlert}
          hideModal={hideModal}
          onPressCancel={() => {
            setShowAlert(false);
            setShowReauthModal(true);
          }}
          cancelButtonText="Delete account"
          okButtonText="Cancel"
        />
        <ReauthModal
          onCancel={() => {
            setShowReauthModal(false);
          }}
          onSubmit={handleReauth}
          visible={showReauthModal}
          error={reauthError}
        />
      </View>
    </View>
  );
};

export default DeleteUserAccount;

const styles = StyleSheet.create({});
