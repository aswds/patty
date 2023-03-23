import React, { useState } from "react";
import Screen from "./components/Screen";
import { GeneralInformationScreenNavigationProps } from "../../../Types/MapStack/ScreenNavigationProps";
import NextButton from "../../../shared/Buttons/NextButton";
import TagList from "./components/TagList";
import Description from "./components/Desctription";
import PickTitle from "./components/PickTitle";
import NavigationBar from "./NavigationBar";

const GeneralInformation = ({
  navigation,
}: GeneralInformationScreenNavigationProps) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>();
  const [tags, setTags] = useState<string[]>([]);
  const isValueEntered = Boolean(title && description && tags);

  const onPress = () => {
    navigation.navigate("LocationAndTime", { title, description, tags });
  };
  return (
    <Screen>
      <NavigationBar navigation={navigation} text={"General information"} />
      <PickTitle setTitle={setTitle} title={title} />
      <Description setDescription={setDescription} description={description} />
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
