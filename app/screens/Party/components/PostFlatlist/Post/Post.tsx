import { AntDesign } from "@expo/vector-icons";
import { ResizeMode, Video } from "expo-av";
import * as Haptics from "expo-haptics";
import moment from "moment";
import { Skeleton } from "moti/skeleton";
import React, { memo, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { FontFamily } from "../../../../../../assets/fonts/Fonts";
import { useTypedSelector } from "../../../../../hooks/useTypedSelector";
import CustomAlert from "../../../../../shared/Alert/CustomAlert";
import { colors } from "../../../../../src/colors";
import { handleAlertError } from "../../../../Map/helpers/handleAlertError";
import { Description } from "../../ShowMoreText";
import { IPost } from "../types";
import DeletePost from "./DeletePost";
import UserContainer from "./UserContainer";
import { ratePost } from "./helpers/ratePost";
import { IUser } from "../../../../../Types/User";
import { AlertConfig } from "../../../../Map/helpers/pickAnAlertType";
import { handleLikesPress, handleMehsPress } from "./helpers/handleRates";
import Loader from "../../../../../shared/Loaders/Loader";
import ListLoader from "../../../../../shared/Loaders/ListLoader";
import { deletePartyPost } from "../../AddPost/deletePost";
interface Props {
  item: IPost;
  uid: string;
  events: IUser["events"];
  handleAlertError: (config: AlertConfig, onCancelCallback: () => void) => void;
}

const checkUserReaction = async (
  mehs: string[],
  likes: string[],
  uid: string | undefined,
  setMehs: (mehs: string[]) => void,
  setLikes: (likes: string[]) => void
) => {
  try {
    const hasMehed = mehs.includes(uid!);
    const hasLiked = likes.includes(uid!);

    if (hasMehed) {
      setMehs(mehs);
    }

    if (hasLiked) {
      setLikes(likes);
    }
  } catch (error) {
    console.error("Error checking user reaction:", error);
  }
};

const Post: React.FC<Props> = ({ item, events, uid, handleAlertError }) => {
  const [mehs, setMehs] = useState<string[]>(item.mehs || []);
  const [likes, setLikes] = useState<string[]>(item.likes || []);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUserReaction(mehs, likes, uid, setMehs, setLikes);
  }, []); // Run the effect only once on mount

  const handleMediaLoad = () => {
    setLoading(false);
  };
  // Function to hide modal

  function handleRatePost(rating: "meh" | "like") {
    if (events.onEvent && uid) {
      ratePost(events.onEvent, item.id, uid, rating);
    } else {
      Alert.alert("Something went wrong...");
    }
  }

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.postHeader}>
          <UserContainer user={item?.user} />
          <Text style={styles.postTimeStamp}>
            {moment(item.createdAt).local().startOf("seconds").fromNow()}
          </Text>
        </View>
        <View style={styles.mediaContainer}>
          {loading && (
            <ListLoader
              style={{
                position: "absolute",
                alignSelf: "center",
                flex: undefined,
              }}
              text="loading"
              size="small"
              textStyle={{ fontSize: 10 }}
            />
          )}
          {item.mediaType === "photo" || item.mediaType === "image" ? (
            <>
              <Image
                source={{ uri: item.media }}
                style={styles.image}
                onLoad={handleMediaLoad}
              />
            </>
          ) : (
            <>
              <Video
                source={{ uri: item.media }}
                style={styles.image}
                resizeMode={ResizeMode.CONTAIN}
                isLooping={true}
                useNativeControls
                onLoad={handleMediaLoad}
              />
            </>
          )}
        </View>

        <View style={styles.bottomContainer}>
          {item.user.uid === uid ? (
            <DeletePost
              handleAlertError={handleAlertError}
              handleDeletePost={() => {
                if (events.onEvent)
                  deletePartyPost(events.onEvent, item.id, item.fileName);
              }}
            />
          ) : (
            <View></View>
          )}
          <View style={styles.rightBottomContainer}>
            <TouchableOpacity
              style={[
                styles.buttonContainer,
                {
                  backgroundColor: mehs?.includes(uid!)
                    ? colors.accentColor
                    : colors.background,
                },
              ]}
              onPress={() =>
                handleMehsPress(
                  mehs,
                  uid,
                  setMehs,
                  setLikes,
                  handleRatePost.bind(null, "meh")
                )
              }
            >
              <AntDesign name="meho" size={25} color="white" />
              <Text style={styles.buttonText}>{mehs?.length}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.buttonContainer,
                {
                  backgroundColor: likes?.includes(uid!)
                    ? colors.accentColor
                    : colors.background,
                },
              ]}
              onPress={() =>
                handleLikesPress(
                  mehs,
                  uid,
                  setLikes,
                  setMehs,
                  handleRatePost.bind(null, "like")
                )
              }
            >
              <AntDesign name="smile-circle" size={25} color="white" />
              <Text style={styles.buttonText}>{likes?.length}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Description description={item?.description} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  loader: {
    position: "absolute",
    top: 0,
    bottom: 0,
    alignSelf: "center",
  },
  mediaContainer: {
    backgroundColor: colors.modalBackground,
    borderRadius: 20,
    justifyContent: "center",

    overflow: "hidden",
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    resizeMode: "cover",

    overflow: "hidden",
  },
  postHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 5,
  },
  descriptionContainer: {
    padding: 5,
    borderRadius: 5,
    flexShrink: 1,
  },
  descriptionText: {
    color: colors.text,
    fontFamily: FontFamily.medium,
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  leftBottomContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  topContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  userPhoto: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  userName: {
    fontWeight: "bold",
  },
  userNickname: {
    color: "gray",
  },
  rightBottomContainer: {
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
  },
  buttonContainer: {
    alignItems: "center",
    shadowColor: "white",
    shadowOpacity: 0.3,
    shadowOffset: { height: 0, width: 0 },
    shadowRadius: 2,
    flexDirection: "row",
    backgroundColor: colors.modalBackground,
    padding: 10,
    borderRadius: 30,
  },
  buttonIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  buttonText: {
    fontSize: 10,
    padding: 5,
    color: colors.text,
    fontFamily: FontFamily.bold,
  },
  postTimeStamp: {
    color: colors.text_2,
    fontFamily: FontFamily.regular,
    fontSize: 12,
  },
});
export default memo(Post);
