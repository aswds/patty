import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  UIManager,
  FlatList,
} from "react-native";
import TrackInfo from "../TrackInfo";
import { IEvent } from "../../../../Types/Events";
import { NavigationProp } from "@react-navigation/native";
import { PartyCreationNavigationProps } from "../../../../Types/MapStack/ScreenNavigationProps";
import Header from "./Header";
import PartyStats from "../PartyStats";
import { colors } from "../../../../src/colors";
import { PartyCreationNavigatorParamList } from "../../../../Types/MapStack/NavigationTypes";

interface PartyHeaderProps {
  party: IEvent;
  trackInfo?: {
    title?: string;
    artist?: string;
    image?: string;
  };
  navigation: NavigationProp<any, any>;
}

const PartyHeader: React.FC<PartyHeaderProps> = ({
  navigation,
  party,
  trackInfo,
}) => {
  return (
    <View style={styles.container}>
      <Header navigation={navigation} title={party.title} user={party.user} />
      <PartyStats startedAt={party.createdAt} guests={party.guests.length} />
      {/* <CollaborativePlaylistScreen /> */}
      {/* <TrackInfo trackInfo={trackInfo} /> */}
      {/* <TrackInfo trackInfo={trackInfo} /> */}
    </View>
  );
};

export default PartyHeader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
