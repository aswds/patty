import React, {
  ForwardedRef,
  MutableRefObject,
  RefObject,
  useEffect,
  useState,
} from "react";

import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import TagItem from "../../../shared/Tag/TagItem";
import { ActionButtons } from "./components/ActionButtons";
import { Event } from "../../../shared/Events/Event";
import { JoinEventButton } from "./components/JoinPartyButton";
import { IEvent } from "../../../Types/Events";
import BottomSheet from "@gorhom/bottom-sheet";
import { ModalProps } from "../Types/Modals";
import { colors } from "../../../src/colors";
import { FontFamily } from "../../../../assets/fonts/Fonts";
import BottomSheetModal from "../BottomSheetModal";
import { joinEvent, leaveEvent } from "../../Map/Firebase/leaveEvents";
import _, { update } from "lodash";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { removeItemOnce } from "../../../helpers/removeItemOnce";
import { useNavigation } from "@react-navigation/native";
import { MapNavigationProps } from "../../../Types/MapStack/ScreenNavigationProps";
import { useActions } from "../../../hooks/useActions";
import { AppNavigatorNavigationProp } from "../../../Types/AppNavigator/AppNavigator";
import { fetch_joined_event } from "../../../redux/actions/Events";
import CustomAlert from "../../../shared/Alert/CustomAlert";
import { deleteParty } from "./components/actionButtonsFunctions";
import { pickAlertErrors } from "../../Map/helpers/pickAnAlertType";

function Description({ markerInfo }: { markerInfo: IEvent }) {
  return (
    <View style={styles.descriptionContainer}>
      <Text style={styles.descriptionTextStyle}>{markerInfo?.description}</Text>
    </View>
  );
}
function TagList({ markerInfo }: { markerInfo: IEvent }) {
  return (
    <View style={styles.tagsContainer}>
      {markerInfo?.tags?.map((tag, index) => (
        <TagItem tag={tag} id={index} onDelete={() => {}} key={index} />
      ))}
    </View>
  );
}

type PartyMarkerModalProps = ModalProps & {
  markerInfo: IEvent;
  modalRef: RefObject<BottomSheet>;
  onLeaveCurrentEvent: () => void;
  onJoin: (event: IEvent) => void;
  handleAlertError: (
    title: string,
    message: string,
    cancelText?: string,
    onCancelCallback?: () => void,
    okText?: string
  ) => void;
};

const PartyModal: React.FC<PartyMarkerModalProps> = ({
  markerInfo,
  onClose,
  modalRef,
  onLeaveCurrentEvent,
  handleAlertError,
  onJoin,
}) => {
  const navigation = useNavigation<AppNavigatorNavigationProp>();
  const { current_user } = useTypedSelector((state) => state.user_state);
  const [isJoinedEvent, setIsJoinedEvent] = useState<boolean>(
    markerInfo?.partyID === current_user.events?.onEvent
  );
  const [isCreator, __] = useState<boolean>(
    markerInfo?.user?.uid === current_user.uid!
  );

  useEffect(() => {
    setIsJoinedEvent(markerInfo?.partyID === current_user.events?.onEvent);
  }, [markerInfo?.guests, current_user.events]);

  function onJoinEvent(data: IEvent) {
    joinEvent(data).then((r) => {
      onJoin(data);
      navigation.navigate("PartyNav", {
        screen: "PartyScreen",
        params: {
          partyData: data,
        },
      });
      onClose!();
    });
  }

  function onPress(data: IEvent) {
    if (isJoinedEvent) {
      // host is leaving
      if (current_user.uid === data.user.uid) {
        const alertData = pickAlertErrors("hostLeaving");
        handleAlertError(
          alertData.title,
          alertData.message,
          alertData.cancelText,
          onPressDelete,
          alertData.okText
        );
      } else {
        // user is leaving
        onLeaveCurrentEvent();
      }
    } else {
      if (_.isEmpty(current_user.events.onEvent)) {
        onJoinEvent(data);
      } else {
        const alertData = pickAlertErrors("toJoin");
        handleAlertError(
          alertData.title,
          alertData.message,
          alertData.cancelText,
          onLeaveCurrentEvent,
          alertData.okText
        );
      }
    }
  }

  const onPressDelete = async () => {
    onLeaveCurrentEvent();

    await deleteParty(
      markerInfo.partyID,
      markerInfo.location.fullAddressInfo?.city!,
      markerInfo.party_access
    )
      .then(() => {
        closeModal();
      })
      .catch((e) => console.log(e));
  };

  function closeModal() {
    modalRef.current?.close;
  }

  return (
    <BottomSheetModal modalRef={modalRef} onClose={onClose}>
      <Event markerInfo={markerInfo} />
      <Description markerInfo={markerInfo} />
      <TagList markerInfo={markerInfo} />
      <ActionButtons
        party={markerInfo}
        closeModal={closeModal}
        handleAlertError={handleAlertError}
        onPressDelete={onPressDelete}
      />
      <JoinEventButton
        data={markerInfo}
        onPress={onPress}
        isJoinedEvent={isJoinedEvent}
        isCreator={isCreator}
      />
    </BottomSheetModal>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    margin: -5,
  },
  descriptionTextStyle: {
    fontFamily: FontFamily.medium,
    fontSize: 14,
    color: colors.iconColor,
  },

  descriptionContainer: {
    marginBottom: "5%",
    width: "100%",
  },
});
export default PartyModal;
