import { FontAwesome5 } from "@expo/vector-icons";
import { usePreventScreenCapture } from "expo-screen-capture";
import _ from "lodash";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { FlatList, RefreshControl, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FontFamily } from "../../../assets/fonts/Fonts";
import { IEvent } from "../../Types/Events";
import { PartyNavigationScreenProps } from "../../Types/PartyStack/NavigationTypes";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import CustomAlert from "../../shared/Alert/CustomAlert";
import BigButton from "../../shared/Buttons/BigButton";
import Button from "../../shared/Buttons/Button";
import BoldText from "../../shared/Text/BoldText";
import ListEmptyComponent from "../../shared/UserList/ListEmptyComponent";
import { colors } from "../../src/colors";
import { isAndroid } from "../../src/platform";
import { handleAlertError } from "../Map/helpers/handleAlertError";
import { AlertConfig } from "../Map/helpers/pickAnAlertType";
import PartyHeader from "./components/PostFlatlist/PartyHeader";
import Post from "./components/PostFlatlist/Post/Post";
import { listenToUsersPosts } from "./components/PostFlatlist/Post/helpers/listeners";
import { IPost } from "./components/PostFlatlist/types";
import { cachePosts, getCachedPosts } from "./helpers/cacheFunctions";
import { fetchPartyPosts } from "./helpers/fetchPartyPosts";
const PartyScreen: React.FC<PartyNavigationScreenProps<"PartyScreen">> = ({
  navigation,
  route,
}) => {
  usePreventScreenCapture();
  const [party] = useState<IEvent>(route.params.partyData);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [showAlertModal, setShowAlertModal] = useState<boolean>(false);
  const [alertError, setAlertError] = useState<AlertConfig>({
    message: "",
    title: "",
  });
  const [error, setError] = useState<string>();
  const { uid, events } = useTypedSelector(
    (state) => state.user_state.current_user
  );

  function updatePostData(newPosts: IPost[]) {
    const fetchData = async () => {
      try {
        cachePosts(newPosts);

        const cachedPosts = await getCachedPosts();
        if (!_.isEmpty(cachedPosts)) {
          setPosts(cachedPosts!);
        } else {
          const fetchedPosts = await fetchPartyPosts(party.partyID);
          cachePosts(fetchedPosts);
          setPosts(fetchedPosts);
        }
      } catch (error) {
        setError("Error fetching party posts");
        // Handle the error state here if needed
      }
    };

    fetchData();
  }

  useEffect(() => {
    if (events.onEvent) {
      const listenerPosts = listenToUsersPosts(events.onEvent, (newPosts) => {
        updatePostData(newPosts);
      });

      return () => listenerPosts();
    }
  }, []);

  const _hideModal = React.useCallback(() => {
    setShowAlertModal(false);
  }, []);

  const fetchPartyData = async () => {
    try {
      const cachedPosts = await getCachedPosts();
      if (!_.isEmpty(cachedPosts)) {
        setPosts(cachedPosts!);
      } else {
        const fetchedPosts = await fetchPartyPosts(party.partyID);
        updatePostData(fetchedPosts);
      }
    } catch (error) {
      setError("Error fetching party posts");
      // Handle the error state here if needed
    }
  };

  useEffect(() => {
    fetchPartyData();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await fetchPartyData();
    } catch (error) {
      setError("Error refreshing party posts");
      // Handle the error state here if needed
    } finally {
      setRefreshing(false);
    }
  };

  const insets = useSafeAreaInsets();
  const styles = makeStyles(insets);
  const addPostButtonHeight = 60;

  const bottomPadding = insets.bottom + addPostButtonHeight;
  function _renderItem({ item }: { item: IPost }) {
    const createdAt = moment(item.createdAt).fromNow();
    return (
      <Post
        item={{ ...item, createdAt: createdAt }}
        uid={uid!}
        events={events}
        handleAlertError={handleAlertError.bind(
          null,
          setAlertError,
          setShowAlertModal
        )}
      />
    );
  }
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={posts}
        extraData={posts}
        maxToRenderPerBatch={5}
        initialNumToRender={5}
        keyExtractor={(item, index) => item.id.toString()}
        renderItem={_renderItem}
        ListHeaderComponent={
          <PartyHeader
            navigation={navigation}
            party={party}
            refreshing={refreshing}
            handleAlertError={handleAlertError.bind(
              null,
              setAlertError,
              setShowAlertModal
            )}
          />
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={colors.buttonText}
          />
        }
        ListEmptyComponent={
          <ListEmptyComponent
            title="No Party Posts Yet."
            icon={
              <FontAwesome5 name="stream" size={24} color={colors.text_2} />
            }
            button={
              <Button
                textStyled={styles.buttonsTextStyle}
                style={{ backgroundColor: "transparent" }}
                text="add post"
                onPress={() => navigation.navigate("PostUploadScreen")}
              />
            }
            textStyle={{ fontSize: 20, fontFamily: FontFamily.bold }}
          />
        }
        showsVerticalScrollIndicator={false}
        style={styles.container}
        contentContainerStyle={[
          styles.listEmptyComponentStyle,
          {
            paddingBottom: bottomPadding,
          },
        ]}
      />
      {error && (
        <BoldText onPress={() => setError("")} textStyles={styles.errorStyle}>
          {error}
        </BoldText>
      )}
      <View style={styles.buttonsContainer}>
        <BigButton
          style={styles.buttonStyle}
          textStyle={styles.buttonsTextStyle}
          title="add post"
          onPress={() => navigation.navigate("PostUploadScreen")}
        />
        {party.user.uid === uid ? (
          <BigButton
            style={styles.buttonStyle}
            textStyle={styles.buttonsTextStyle}
            title="make announcement"
            onPress={() => navigation.navigate("AddAnnouncementScreen")}
          />
        ) : null}
      </View>
      <CustomAlert
        showModal={showAlertModal}
        hideModal={_hideModal}
        title={alertError.title}
        errorMsg={alertError.message}
        okButtonText={alertError.okText}
        cancelButtonText={alertError.cancelText}
        cancelButtonTextStyle={{}}
        onPressCancel={() => {
          alertError.onCancelCallback && alertError.onCancelCallback(),
            setShowAlertModal(false);
        }}
      />
    </View>
  );
};

const makeStyles = (insets: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    buttonStyle: {
      flex: 1,
      height: isAndroid ? 60 : 65,
      marginBottom: isAndroid ? "5%" : 0,
      padding: 10,
      // borderStyle: "dashed",
      // backgroundColor: colors.doneButtonBG,
    },
    listEmptyComponentStyle: {
      paddingTop: insets.top,
      paddingHorizontal: 20,
    },
    errorStyle: {
      position: "absolute",
      bottom: 120,
      alignSelf: "center",
      color: colors.cancel,
      padding: 10,
      backgroundColor: colors.background,
      borderRadius: 20,
      overflow: "hidden",
    },
    buttonsTextStyle: {
      textAlign: "center",
      fontFamily: FontFamily.bold,
      fontSize: 13,
    },
    buttonsContainer: {
      position: "absolute",
      flexDirection: "row",
      justifyContent: "space-evenly",
      bottom: insets.bottom,
      width: "100%",
      gap: 10,
      paddingHorizontal: 10,
    },
  });

export default PartyScreen;
