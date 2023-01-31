import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { colors } from "../../../src/colors";
import SwitchDateType from "./components/SwitchDateType";
import * as Haptics from "expo-haptics";
import { Title } from "../PartyCreationScreen/components/TagList";
import { FontAwesome } from "@expo/vector-icons";

export default function PickTime(props) {
  const { setTime, setToScrollBottom } = props;
  const [date, setDate] = useState(new Date(Date.now()));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const minDate = new Date();
  const onChange = (_, selectedDate) => {
    const currentDate = selectedDate;
    setTime(currentDate);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    if (Platform.OS === "android") {
      setShow(false);
      // for iOS, add a button that closes the picker
    }
    setMode(currentMode);
  };
  function onPress() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setShow(true);
    setToScrollBottom(true);
    setMode((mode) => {
      return mode === "date" ? "time" : "date";
    });
  }

  function SelectedTime() {
    return (
      <View style={styles.timeContainer}>
        <Text style={styles.textStyle}>
          Selected time:{" "}
          {date.toLocaleString("ukr", {
            dateStyle: "short",
            timeStyle: "short", // fix
          })}
        </Text>
      </View>
    );
  }
  return (
    <>
      <Title
        title={"Date and time"}
        icon={
          <FontAwesome
            name="calendar"
            size={24}
            color={colors.iconColor}
            style={{ paddingBottom: 5, paddingLeft: 5 }}
          />
        }
      />

      <View style={styles.dateContainer}>
        <SelectedTime />
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            style={styles.datePickerStyle}
            value={date}
            mode={mode}
            minimumDate={minDate}
            timeZoneOffsetInSeconds={0}
            onChange={onChange}
            display="spinner"
          />
        )}
        <SwitchDateType
          dateMode={mode}
          onPress={onPress}
          isConfirmButtonShown={show}
          onDone={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            setShow(false);
            setToScrollBottom(false);
          }}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  dateContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  timeContainer: {
    backgroundColor: colors.input,
    padding: "5%",
    marginVertical: 20,
    borderRadius: 99999,
  },
  datePickerStyle: {
    width: "100%",
    height: 200,
  },
  textStyle: {
    fontFamily: "WorkSans-Bold",
    fontSize: 18,
    color: colors.iconColor,
  },
});
