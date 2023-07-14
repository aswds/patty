import { NavigationProp } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import { IEvent } from "../../../../Types/Events";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import UploadProgressBar from "../../../../shared/ProgressBar/UploadProgressBar";
import { colors } from "../../../../src/colors";
import { AlertConfig } from "../../../Map/helpers/pickAnAlertType";
import Announcements from "../Announcements/Announcements";
import PartyStats from "../PartyStats";
import Header from "./Header";
import UploadCompression from "../../../../shared/ProgressBar/UploadCompression";
interface PartyHeaderProps {
  party: IEvent;
  handleAlertError: (config: AlertConfig, onCancelCallback: () => void) => void;
  navigation: NavigationProp<any, any>;
  refreshing: boolean;
}

const PartyHeader: React.FC<PartyHeaderProps> = ({
  navigation,
  party,
  refreshing,
  handleAlertError,
}) => {
  const { isUploading, isUploadingCompress } = useTypedSelector(
    (state) => state.upload
  );

  return (
    <View style={styles.container}>
      <Header navigation={navigation} title={party.title} user={party.user} />
      <PartyStats startedAt={party.createdAt} guests={party.guests.length} />
      <View style={{ flex: 1 }}>
        <Announcements
          partyId={party.partyID!}
          refreshing={refreshing}
          handleAlertError={handleAlertError}
        />
      </View>
      <View
        style={{ borderWidth: 1, borderColor: colors.text_2, borderRadius: 2 }}
      />
      <View style={{ marginVertical: 5 }}>
        {isUploadingCompress && !isUploading && <UploadCompression />}
        {isUploading && !isUploadingCompress && <UploadProgressBar />}
      </View>
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
