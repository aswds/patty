import React, { useState } from "react";
import { Screen } from "../../../shared/Screen/Screen";
import { PartyCreationStackScreenProps } from "../../../Types/MapStack/ScreenNavigationProps";
import NextButton from "../../../shared/Buttons/NextButton";
import TagList from "./components/TagList";
import Description from "./components/Desctription";
import PickTitle from "./components/PickTitle";
import NavigationBar from "./NavigationBar";
import { IEvent, Party_Access_Types } from "../../../Types/Events";
import PartyAccess from "./PartyAccess/PartyAccess";
import { useActions } from "../../../hooks/useActions";
import { ScreenCreateParty } from "../../../shared/Screen/ScreenCreateParty";
import { handleAlertError } from "../helpers/handleAlertError";
import { AlertConfig } from "../helpers/pickAnAlertType";
import CustomAlert from "../../../shared/Alert/CustomAlert";
const GeneralInformation = ({
  navigation,
}: PartyCreationStackScreenProps<"GeneralInformation">) => {
  const [eventTitle, setEventTitle] = useState<string>("");
  const [description, setDescription] = useState<string>();
  const [tags, setTags] = useState<IEvent["tags"]>([]);
  const [party_access, setParty_Access] =
    useState<Party_Access_Types>("Public");
  const [showAlertModal, setShowAlertModal] = useState<boolean>(false);
  const { createEventsGeneralDataUpdate } = useActions();
  const isValueEntered = Boolean(eventTitle && description && tags);
  const [error, setError] = useState<AlertConfig>({
    title: "",
    message: "",
  });

  const handleParty_AccessUpdate = (party_access: Party_Access_Types) => {
    // Update the PARTY_ACCESS status
    setParty_Access(party_access);
  };

  const handleErrorMessage = (titleToSet: string, message: string) => {
    if (titleToSet.length < 1) {
      setError({
        title: !eventTitle
          ? "Please enter a title"
          : "Please enter a description",
        message: "Uh-oh! Looks like someone forgot to fill in the blanks.",
      });
    }
    setShowAlertModal(true);
  };

  const handlePress = () => {
    if (eventTitle && description) {
      // All required fields are entered, proceed with creating the event
      createEventsGeneralDataUpdate({
        title: eventTitle,
        description,
        tags,
        party_access,
      });
      navigation.navigate("LocationAndTime", {});
    } else {
      // Set the error title depending on which field is missing

      handleErrorMessage(
        !eventTitle ? "Please enter a title" : "Please enter a description",
        "Uh-oh! Looks like someone forgot to fill in the blanks."
      );
    }
  };
  return (
    <ScreenCreateParty
      navigationBar={
        <NavigationBar navigation={navigation} text={"General information"} />
      }
    >
      <PickTitle setTitle={setEventTitle} title={eventTitle} />
      <Description setDescription={setDescription} description={description} />
      <PartyAccess
        onParty_AccessUpdate={handleParty_AccessUpdate}
        party_access={party_access}
      />

      <TagList setTags={setTags} tags={tags} />
      <NextButton
        onPress={handlePress}
        handleErrorMessage={handleErrorMessage}
        style={{ position: "relative", marginTop: "auto" }}
        isValueEntered={isValueEntered}
        error={error}
      />
      <CustomAlert
        errorMsg={error.message}
        title={error.title}
        hideModal={() => setShowAlertModal(false)}
        showModal={showAlertModal}
      />
    </ScreenCreateParty>
  );
};

export default GeneralInformation;
