import React, { useState } from "react";
import Screen from "./components/Screen";
import { PartyCreationStackScreenProps } from "../../../Types/MapStack/ScreenNavigationProps";
import NextButton from "../../../shared/Buttons/NextButton";
import TagList from "./components/TagList";
import Description from "./components/Desctription";
import PickTitle from "./components/PickTitle";
import NavigationBar from "./NavigationBar";
import { IEvent, RSVP_Types } from "../../../Types/Events";
import RSVP from "./RSVP/RSVP";
import { useActions } from "../../../hooks/useActions";

const GeneralInformation = ({
  navigation,
}: PartyCreationStackScreenProps<"GeneralInformation">) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>();
  const [tags, setTags] = useState<IEvent["tags"]>([]);
  const [rsvp, setRsvp] = useState<RSVP_Types>("Public");
  const { createEventsGeneralDataUpdate } = useActions();
  const isValueEntered = Boolean(title && description && tags);

  const handleRsvpUpdate = (rsvp: RSVP_Types) => {
    // Update the RSVP status
    setRsvp(rsvp);
  };

  const onPress = () => {
    createEventsGeneralDataUpdate({
      title,
      description,
      tags,
      rsvp,
    });
    navigation.navigate("LocationAndTime", {});
  };
  return (
    <Screen>
      <NavigationBar navigation={navigation} text={"General information"} />
      <PickTitle setTitle={setTitle} title={title} />
      <Description setDescription={setDescription} description={description} />
      <RSVP onRsvpUpdate={handleRsvpUpdate} />

      <TagList setTags={setTags} tags={tags} />
      <NextButton
        onPress={onPress}
        style={{ position: "relative", marginTop: "auto" }}
        isValueEntered={isValueEntered}
        error={"information"}
      />
    </Screen>
  );
};

export default GeneralInformation;
