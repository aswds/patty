import React from "react";

import { View } from "react-native";
import { IEvent } from "../../../Types/Events";
import RenderItem from "./RenderItem";
import { Region } from "react-native-maps";

interface JoinedEventsProps {
  joinedEvents: IEvent[];
  animateToRegion: (region: Region) => void;
}
const JoinedEventsList: React.FC<JoinedEventsProps> = ({
  joinedEvents,
  animateToRegion,
}) => {
  function onPress(region: Region) {
    animateToRegion(region);
  }
  return (
    <View>
      {joinedEvents.map((event) => (
        <RenderItem
          item={event}
          onPress={() => {
            onPress(event.location?.region!);
          }}
        />
      ))}
    </View>
  );
};

export default JoinedEventsList;
