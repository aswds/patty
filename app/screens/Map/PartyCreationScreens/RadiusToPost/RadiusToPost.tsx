import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Title } from "../../../../shared/Title/Title";
import CircleRadiusButton from "./CircleRadiusButton";

interface RadiusToPostProps {
  onPress: (radius: number) => void;
}

const RadiusToPost = ({ onPress }: RadiusToPostProps) => {
  let radiuses = [50, 100, 150, 200];
  const [selectedRadius, setSelectedRadius] = useState(radiuses[0]);
  function onSelect(radius: number) {
    onPress(radius);
    setSelectedRadius(radius);
  }
  return (
    <View style={{ flex: 1 }}>
      <Title
        title="Radius"
        description="Here, you can select the distance at which users can access a party media."
      />
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        {radiuses.map((radius, index) => {
          return (
            <CircleRadiusButton
              key={index}
              radius={radius}
              onPress={onSelect}
              selectedRadius={selectedRadius}
            />
          );
        })}
      </View>
    </View>
  );
};

export default RadiusToPost;

const styles = StyleSheet.create({});
