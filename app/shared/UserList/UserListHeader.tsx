import React, { useState } from "react";

import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MapNavigationProps } from "../../Types/MapStack/ScreenNavigationProps";
import { colors } from "../../src/colors";
import { Title } from "../Title/Title";
import SearchBar from "./SearchBar";
interface UserListHeaderProps {
  handleSearch: (text: string) => void;
  onPressClear: () => void;
  headerTitle?: string;
}

const UserListHeader: React.FC<UserListHeaderProps> = ({
  handleSearch,
  onPressClear,
  headerTitle,
}) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<MapNavigationProps>();
  const [searchText, setSearchText] = useState("");

  function _onPressClear() {
    onPressClear();
    setSearchText("");
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Title
        title={headerTitle ?? "Guests"}
        navigation={navigation}
        containerStyle={{
          alignContent: "flex-start",
          justifyContent: "flex-start",
        }}
      />
      <SearchBar
        containerStyle={styles.inputContainer}
        inputStyle={styles.inputStyle}
        placeholder={"Search"}
        placeholderTextColor={colors.iconColor}
        onPressClear={_onPressClear}
        onChangeText={(text) => {
          handleSearch(text);
          setSearchText(text);
        }}
        value={searchText}
      />

      {/*<TouchableOpacity style={styles.editGroupStyle}>*/}
      {/*  <Feather name="edit" size={30} color={colors.accentColor} />*/}
      {/*</TouchableOpacity>*/}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    alignItems: "center",
    width: "90%",
    justifyContent: "center",
  },
  editGroupStyle: {
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    aspectRatio: 1,
    overflow: "hidden",
  },
  backButtonStyle: {
    position: "relative",
    left: 0,
    backgroundColor: "transparent",
  },
  inputContainer: {
    backgroundColor: colors.input,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    flex: 1,
    overflow: "hidden",
  },
  inputStyle: {
    flex: 1,
    color: "white",
  },
});
export default UserListHeader;
