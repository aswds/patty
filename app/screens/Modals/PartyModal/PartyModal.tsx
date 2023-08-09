import React, { RefObject, useEffect, useState } from "react";

import BottomSheet from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import _ from "lodash";
import { StyleSheet, Text, View } from "react-native";
import { FontFamily } from "../../../../assets/fonts/Fonts";
import { AppNavigatorNavigationProp } from "../../../Types/AppNavigator/AppNavigator";
import { IEvent } from "../../../Types/Events";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { Event } from "../../../shared/Events/Event";
import TagItem from "../../../shared/Tag/TagItem";
import { colors } from "../../../src/colors";
import { joinEvent } from "../../Map/Firebase/eventFunctions";
import { AlertConfig, pickAlertText } from "../../Map/helpers/pickAnAlertType";
import BottomSheetModal from "../BottomSheetModal";
import { ModalProps } from "../Types/Modals";
import { ActionButtons } from "./components/ActionButtons";
import { JoinEventButton } from "./components/JoinPartyButton";
import { deleteParty } from "./components/actionButtonsFunctions";

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
        <TagItem
          tag={tag}
          id={index}
          onDelete={(id: string) => {}}
          key={index}
        />
      ))}
    </View>
  );
}

type PartyMarkerModalProps = ModalProps & {
  markerInfo: IEvent;
  modalRef: RefObject<BottomSheet>;
  onLeaveCurrentEvent: () => void;
  onJoin: (event: IEvent) => void;
  onDeleteCurrentEvent: () => void;
  handleAlertError: (
    type: AlertConfig,
    onCancelCallback?: () => void,
    onOkCallback?: () => void
  ) => void;
  navigateToPartyScreen: (partyData: IEvent) => void;
};

const PartyModal: React.FC<PartyMarkerModalProps> = ({
  markerInfo,
  onClose,
  modalRef,
  onDeleteCurrentEvent,
  onLeaveCurrentEvent,
  handleAlertError,
  onJoin,
  navigateToPartyScreen,
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

  async function onPressDelete() {
    onLeaveCurrentEvent();
    await deleteParty(
      markerInfo.partyID,
      markerInfo.location.fullAddressInfo?.partyLocation!,
      markerInfo.party_access
    ).then(() => {
      closeModal();
    });
  }
  function onJoinEvent(data: IEvent) {
    const current_date = new Date();
    if (current_date > data?.time) {
      navigateToPartyScreen(data);
    } else {
      joinEvent(data).then((r) => {
        onJoin(data);
        navigation.navigate("PartyNav", {
          screen: "PartyScreen",
          params: {
            partyData: data,
          },
        });
      });
    }

    onClose!();
  }
  function onPress(data: IEvent) {
    if (isJoinedEvent) {
      // host is leaving
      if (current_user.uid === data.user.uid) {
        const config = pickAlertText("hostLeaving");
        handleAlertError(config, onDeleteCurrentEvent);
      } else {
        // user is leaving
        onLeaveCurrentEvent();
      }
    } else {
      if (_.isEmpty(current_user.events.onEvent)) {
        onJoinEvent(data);
      } else {
        if (current_user.uid === current_user.events.onEvent) {
          const alertData = pickAlertText("hostLeavingToJoin");
          handleAlertError(alertData, onDeleteCurrentEvent);
        } else {
          const alertData = pickAlertText("toJoin");
          handleAlertError(alertData, onLeaveCurrentEvent);
        }
      }
    }
  }

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
        onPressDelete={onDeleteCurrentEvent}
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
