import React, {
  PropsWithChildren,
  RefObject,
  useEffect,
  useState,
} from "react";
import { StyleSheet, TextInput } from "react-native";
import { FontFamily } from "../../../../assets/fonts/Fonts";
import CustomAlert from "../../../shared/Alert/CustomAlert";
import BigButton from "../../../shared/Buttons/BigButton";
import { ScreenCreateParty } from "../../../shared/Screen/ScreenCreateParty";
import { colors } from "../../../src/colors";
import NavigationBar from "../../Map/PartyCreationScreens/NavigationBar";

interface ChangeScreenProps extends PropsWithChildren {
  navigation: any;
  navBarTitle: string;
  onBackPress: () => void;
  onPressSave: () => void;
  showAlertModal: boolean;
  hideModal: () => void;
  inputRef: RefObject<TextInput>;
}

const ChangeScreen: React.FC<ChangeScreenProps> = ({
  navigation,
  navBarTitle,
  onBackPress,
  hideModal,
  showAlertModal,
  onPressSave,
  inputRef,
  children,
}) => {
  const [shouldFocus, setShouldFocus] = useState(false);

  // Wait for 200ms before setting the autoFocus prop to true
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShouldFocus(true);
    }, 200);

    return () => clearTimeout(timeout);
  }, []);

  // Set focus on the input element when shouldFocus is true
  useEffect(() => {
    if (shouldFocus) {
      inputRef.current?.focus();
    }
  }, [shouldFocus]);

  return (
    <ScreenCreateParty
      containerStyle={{ paddingTop: 10 }}
      keyboardOffset={65}
      navigationBar={
        <NavigationBar
          navigation={navigation}
          text={navBarTitle}
          onPress={onBackPress}
          iconName="close"
        />
      }
    >
      {children}
      <CustomAlert
        showModal={showAlertModal}
        hideModal={hideModal}
        title="Discard changes?"
        errorMsg="Your unsaved changes will be lost."
        okButtonText="discard changes"
        okButtonTextStyle={{
          fontFamily: FontFamily.extra_bold,
          color: colors.accentColor,
        }}
        onPressOk={() => navigation.goBack()}
        cancelButtonTextStyle={{
          fontFamily: FontFamily.bold,
          color: colors.text,
        }}
        cancelButtonText="keep editing"
        onPressCancel={hideModal}
      />
      <BigButton
        style={{ bottom: 0, alignSelf: "center" }}
        title="Save"
        onPress={onPressSave}
      />
    </ScreenCreateParty>
  );
};

export default ChangeScreen;

const styles = StyleSheet.create({});
