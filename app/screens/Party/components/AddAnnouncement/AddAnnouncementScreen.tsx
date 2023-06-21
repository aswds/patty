import "firebase/storage";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { FontFamily } from "../../../../../assets/fonts/Fonts";
import { PartyNavigationScreenProps } from "../../../../Types/PartyStack/NavigationTypes";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import BigButton from "../../../../shared/Buttons/BigButton";
import Input from "../../../../shared/Input/Input";
import { Screen } from "../../../../shared/Screen/Screen";
import { colors } from "../../../../src/colors";
import NavigationBar from "../../../Map/PartyCreationScreens/NavigationBar";
import { addAnnouncement } from "./addAnnouncement";
export default function AddAnnouncementScreen({
  navigation,
}: PartyNavigationScreenProps<"AddAnnouncementScreen">) {
  const [announcementTitle, setAnnouncementTitle] = useState("");
  const [announcementText, setAnnouncementText] = useState("");
  const { events, image, uid, name, surname, username } = useTypedSelector(
    (state) => state.user_state.current_user
  );
  const handleAnnouncementTitleChange = (text: string) => {
    setAnnouncementTitle(text);
  };

  const handleAnnouncementTextChange = (text: string) => {
    setAnnouncementText(text);
  };

  return (
    <Screen
      navigationBar={
        <NavigationBar text="Announcement" navigation={navigation} />
      }
    >
      <View style={styles.container}>
        <Input
          placeholder="Enter title"
          value={announcementTitle}
          onChangeText={handleAnnouncementTitleChange}
          style={styles.input}
          isValid
          autoCorrect={false}
          maxLength={50}
          inputStyle={{ fontFamily: FontFamily.extra_bold, fontSize: 16 }}
        />
        <Input
          keyboardAppearance={"dark"}
          placeholder="Enter announcement"
          placeholderTextColor={colors.iconColor}
          onChangeText={handleAnnouncementTextChange}
          multiline
          defaultValue={announcementText}
          style={styles.announcementTextInput}
          isValid
          autoCorrect={false}
          maxLength={250}
        />
      </View>
      <View>
        <Text
          style={{
            marginVertical: 10,
            fontFamily: FontFamily.medium,
            color: colors.text_2,
          }}
        >
          this announcement will be seen by all users
        </Text>
      </View>

      <BigButton
        title="Add announcement"
        onPress={() => {
          if (events.onEvent)
            addAnnouncement(events.onEvent, {
              user: {
                image,
                name,
                surname,
                uid,
                username,
              },
              title: announcementTitle,
              announcement: announcementText,
            }).then(() => {
              navigation.goBack();
            });
        }}
        disabled={!(announcementText && announcementTitle)}
        style={styles.bigButton}
        textStyle={styles.bigButtonText}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    flex: 1,
    marginTop: "5%",
    alignItems: "center",
    width: "100%",
  },
  announcementTextInput: {
    borderRadius: 20,
    paddingTop: 10,
    color: colors.text,
    width: "100%",
    height: 100,
    fontSize: 15,
    fontFamily: FontFamily.medium,
    alignItems: "flex-start",
  },
  input: {
    width: "100%",
    borderRadius: 20,
    color: colors.text,
  },

  pickMediaButton: {
    backgroundColor: "rgba(155, 50, 50, 0.2)",
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: colors.accentColor,
    borderRadius: 20,
    width: "100%",
    aspectRatio: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "5%",
  },
  pickMediaButtonText: {
    color: colors.accentColor,
    fontFamily: FontFamily.bold,
    fontSize: 20,
  },
  pickMediaButtonIcon: {
    color: colors.accentColor,
  },

  bigButton: {
    width: "100%",
    height: 60,
  },
  bigButtonText: {
    fontFamily: FontFamily.bold,
  },
});
