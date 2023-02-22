import React, { useState } from "react";
import Screen from "./components/Screen";
import PickTitle from "./components/PickTitle";
import Description from "./components/Desctription";
import TagList from "./components/TagList";
import { BackButton } from "../../../shared/Buttons/BackButton";
import { GeneralInformationScreenNavigationProps } from "../../../Types/MapStack/ScreenNavigationProps";

const GeneralInformation = ({
  navigation,
}: GeneralInformationScreenNavigationProps) => {
  const [title, setTitle] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [tags, setTags] = useState([]);
  return (
    <Screen>
      <BackButton
        navigation={navigation}
        style={{ position: "relative", left: 0 }}
      />
      <PickTitle setTitle={setTitle} title={title} />
      <Description setDescription={setDescription} description={description} />
      <TagList setTags={setTags} tags={tags} />
    </Screen>
  );
};

export default GeneralInformation;
