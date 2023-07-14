import { AntDesign } from "@expo/vector-icons";
import { ResizeMode, Video } from "expo-av";
import React, { memo, useEffect, useState } from "react";
import { Alert, Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { FontFamily } from "../../../../../../assets/fonts/Fonts";
import { IUser } from "../../../../../Types/User";
import ListLoader from "../../../../../shared/Loaders/ListLoader";
import { colors } from "../../../../../src/colors";
import {
  AlertConfig,
  pickAlertText,
} from "../../../../Map/helpers/pickAnAlertType";
import { deletePartyPost } from "../../AddPost/deletePost";
import { Description } from "../../ShowMoreText";
import { IPost } from "../types";
import DeletePost from "./DeletePost";
import ReactionButton from "./ReactionButton";
import UserContainer from "./UserContainer";
import { handleRatingPress } from "./helpers/handleRates";
import { ratePost } from "./helpers/ratePost";
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
  // // Function to hide modal

  function handleRatePost(rating: "meh" | "like" | "unmeh" | "unlike") {
    if (events.onEvent && uid) {
      ratePost(events.onEvent, item.id, uid, rating);
    } else {
      Alert.alert("Something went wrong...");
    }
  }

  return (
    <View style={styles.container}>
      <View style={{ width: "100%" }}>
        <View style={styles.postHeader}>
          <UserContainer user={item?.user} />
          <Text style={styles.postTimeStamp}>{item.createdAt}</Text>
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
                resizeMode={ResizeMode.COVER}
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
              handleDeletePost={() => {
                handleAlertError(pickAlertText("deletePost"), () =>
                  deletePartyPost(events.onEvent, item.id, item.fileName)
                );
              }}
            />
          ) : (
            <View></View>
          )}
          {/* <View style={styles.rightBottomContainer}>
            <ReactionButton
              count={mehs?.length}
              backgroundColor={
                mehs?.includes(uid!) ? colors.accentColor : colors.background
              }
              onPress={() =>
                handleRatingPress(
                  "meh",
                  likes,
                  mehs,
                  uid,
                  setLikes,
                  setMehs,
                  (rating: "meh" | "unmeh" | "like" | "unlike") =>
                    handleRatePost(rating)
                )
              }
              icon={<AntDesign name="meho" size={24} color="white" />}
            />
            <ReactionButton
              count={likes?.length}
              backgroundColor={
                likes?.includes(uid!) ? colors.accentColor : colors.background
              }
              onPress={() =>
                handleRatingPress(
                  "like",
                  mehs,
                  likes,
                  uid,
                  setMehs,
                  setLikes,
                  (rating: "meh" | "unmeh" | "like" | "unlike") =>
                    handleRatePost(rating)
                )
              }
              icon={<AntDesign name="smile-circle" size={24} color="white" />}
            />
          </View> */}
        </View>
      </View>
      <Description description={item?.description} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background,
  },
  loader: {
    position: "absolute",
    top: 0,
    bottom: 0,
    alignSelf: "center",
  },
  mediaContainer: {
    overflow: "hidden",
    justifyContent: "center",
    height: Dimensions.get("screen").height / 1.7,
    borderRadius: 20,
    backgroundColor: colors.modalBackground,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
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

  buttonIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  postTimeStamp: {
    color: colors.text_2,
    fontFamily: FontFamily.regular,
    fontSize: 12,
  },
});
export default memo(Post);
