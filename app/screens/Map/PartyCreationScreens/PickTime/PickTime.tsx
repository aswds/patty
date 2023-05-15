import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Haptics from "expo-haptics";
import { FontAwesome } from "@expo/vector-icons";
import { colors } from "../../../../src/colors";
import { isAndroid } from "../../../../src/platform";
import moment from "moment/moment";
import { Title } from "../../../../shared/Title/Title";
import { descriptionTexts } from "../descriptionTexts";
import { FontFamily } from "../../../../../assets/fonts/Fonts";
import SwitchDateType from "./components/SwitchDateType";
import { roundDate } from "./helpers/roundDate";
interface PickTimeProps {
  setTime: (time: any) => void;
  setToScrollBottom?: (toScroll: boolean) => void;
}

export default function PickTime(props: PickTimeProps) {
  type IOSMode = "date" | "time" | "datetime" | "countdown";
  const { setTime, setToScrollBottom } = props;
  const [date, setDate] = useState<Date | undefined>(roundDate(new Date(), 5));
  const [mode, setMode] = useState<IOSMode | undefined>("date");
  const [show, setShow] = useState(false);
  const minDate = new Date();
  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (isAndroid) {
      setShow(false);
    }
    const currentDate = selectedDate;

    setTime(currentDate);
    setDate(currentDate);
  };

  function onPress() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setShow(true);
    if (setToScrollBottom) {
      setToScrollBottom(true);
    }
    setMode((mode) => {
      return mode === "date" ? "time" : "date";
    });
  }

  function SelectedTime() {
    return (
      <View style={styles.timeContainer}>
        <Text style={styles.textStyle}>{moment(date).format("lll")}</Text>
      </View>
    );
  }
  return (
    <>
      <Title
        title={"Gathering Time"}
        icon={
          <FontAwesome
            name="calendar"
            size={24}
            color={colors.text}
            style={{ paddingLeft: 5 }}
          />
        }
        description={descriptionTexts.dateAndTime}
      />

      <View style={styles.dateContainer}>
        <SelectedTime />
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            style={styles.datePickerStyle}
            value={date as Date}
            mode={mode}
            minimumDate={minDate}
            minuteInterval={5}
            // display={(!isAndroid && "spinner") || undefined}
            display={"spinner"}
            onChange={onChange}
            textColor={isAndroid ? "black" : colors.text}
          />
        )}
        <SwitchDateType
          dateMode={mode}
          onPress={onPress}
          isConfirmButtonShown={show}
          onDone={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            setShow(false);
            if (setToScrollBottom) {
              setToScrollBottom(false);
            }
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
    width: "100%",
    backgroundColor: colors.input,
    padding: "5%",
    marginBottom: 20,
    borderRadius: 99999,
  },
  datePickerStyle: {
    width: "100%",
    height: 200,
  },
  textStyle: {
    fontFamily: FontFamily.bold,
    textAlign: "center",
    fontSize: 18,
    color: colors.iconColor,
  },
});
