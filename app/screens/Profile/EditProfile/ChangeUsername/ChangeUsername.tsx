import { useEffect, useRef, useState } from "react";
import {
  LayoutAnimation,
  StyleSheet,
  TextInput,
  UIManager,
} from "react-native";
import { FontFamily } from "../../../../../assets/fonts/Fonts";
import { ProfileStackScreenNavigationProps } from "../../../../Types/ProfileStack/ScreenNavigationProps";
import { sameUsernames } from "../../../../services/sameUsername";
import { text_modifier } from "../../../../services/text_modifier";
import AnimatedError from "../../../../shared/Error/AnimatedError";
import { colors } from "../../../../src/colors";
import { isAndroid } from "../../../../src/platform";
import ChangeScreen from "../../Layout/ChangeScreen";
import { changeUser } from "../ChangeBio/changeUser";

const ChangeUsername = ({
  navigation,
  route,
}: ProfileStackScreenNavigationProps<"ChangeUsername">) => {
  const [isUsernameValid, setIsUsernameValid] = useState<boolean>(true);
  const [username, setUsername] = useState<string>(route.params.username!);
  const [errorMsg, setErrorMsg] = useState<string>("Username");
  const [showAlertModal, setShowAlertModal] = useState<boolean>(false);
  const inputRef = useRef<TextInput>(null);

  if (isAndroid && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  function hideModal() {
    setShowAlertModal(false);
  }

  //dududjx
  //idjxmcm
  function onBackPress() {
    if (username != route.params.username) {
      setShowAlertModal(true);
    } else {
      navigation.goBack();
    }
  }
  function onPressSave() {
    if (username !== route.params.username)
      sameUsernames(username, setErrorMsg)
        .then(() => {
          if (isUsernameValid) {
            changeUser({ username }).then(() =>
              navigation.navigate("EditProfile", { username: username })
            );
          } else {
            navigation.goBack();
          }
        })
        .catch((err) => {
          if (username !== `${route.params.username}`) {
            usernameAnimationLayout(false);
          }
        });
    else {
      navigation.goBack();
    }
  }

  function usernameAnimationLayout(state: boolean) {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    setIsUsernameValid(state);
  }

  useEffect(() => {
    if (!isUsernameValid) {
      setTimeout(() => {
        if (!isUsernameValid) {
          usernameAnimationLayout(true);
        }
      }, 5000);
    }
  }, [isUsernameValid]);

  return (
    <ChangeScreen
      navBarTitle="Edit username"
      hideModal={hideModal}
      navigation={navigation}
      onBackPress={onBackPress}
      onPressSave={onPressSave}
      showAlertModal={showAlertModal}
      inputRef={inputRef}
    >
      <TextInput
        onChangeText={(text) => {
          setUsername(text_modifier(text));
        }}
        placeholder="Username"
        defaultValue={`@${username}`}
        onEndEditing={() => {}}
        style={styles.textInputStyle}
        ref={inputRef}
      />
      {!isUsernameValid && errorMsg && (
        <AnimatedError
          errorMessage={errorMsg}
          onPress={() => usernameAnimationLayout(true)}
        />
      )}
    </ChangeScreen>
  );
};

export default ChangeUsername;

const styles = StyleSheet.create({
  textInputStyle: {
    borderBottomWidth: 1,
    borderColor: colors.text,
    color: colors.text,
    fontFamily: FontFamily.bold,
    padding: 10,
  },
});
