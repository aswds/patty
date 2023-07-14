import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import { FontFamily } from "../../../../../assets/fonts/Fonts";
import { IEvent } from "../../../../Types/Events";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import IconButton from "../../../../shared/Icons/IconButton";
import { colors } from "../../../../src/colors";
import {
  AlertConfig,
  pickAlertText,
} from "../../../Map/helpers/pickAnAlertType";
import InviteButton from "./Share";

interface ActionButtonsProps {
  party: IEvent;
  closeModal: () => void;
  handleAlertError: (
    type: AlertConfig,
    onCancelCallback: () => void,
    onOkCallback?: () => void
  ) => void;
  onPressDelete: () => void;
}

export function ActionButtons({
  party,
  handleAlertError,
  onPressDelete,
}: ActionButtonsProps) {
  const { uid, events } = useTypedSelector(
    (state) => state.user_state.current_user
  );

  return (
    <View style={styles.actionsButtonContainer}>
      {(!party?.isViaInvite || party?.user.uid == uid) &&
        party?.partyID === events?.onEvent &&
        party?.user?.uid && <InviteButton creatorUID={party.user.uid} />}

      {/* {party?.user.uid != uid && (
        <IconButton
          text={"Report"}
          Icon={MaterialIcons}
          name={"report"}
          textStyle={styles.iconTextStyle}
          onPress={() => {}}
        />
      )} */}
      {party?.user.uid == uid && (
        <IconButton
          text={"Delete"}
          Icon={MaterialIcons}
          name={"delete-forever"}
          textStyle={styles.iconTextStyle}
          onPress={() => {
            handleAlertError(pickAlertText("toDeleteParty"), onPressDelete);
          }}
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  actionsButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: "5%",
    width: "100%",
  },
  iconTextStyle: {
    color: colors.text,
    fontFamily: FontFamily.bold,
  },
});
