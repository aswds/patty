import AsyncStorage from "@react-native-async-storage/async-storage";
import { IPost } from "../components/PostFlatlist/types";
import moment from "moment";
import _ from "lodash";
import { Alert } from "react-native";

export const cacheKey = "cachedPosts";
export const joinedAtKey = "joinedAt";
export const cachePosts = async (postsToCache: IPost[]) => {
  try {
    if (_.isEqual(getCachedPosts(), postsToCache)) {
    }
    const cachedPosts = postsToCache.map((post) => {
      return {
        ...post,
        createdAt: post.createdAt ? moment(post.createdAt.toDate()) : null,
      };
    });

    await AsyncStorage.setItem(cacheKey, JSON.stringify(cachedPosts));
  } catch (error) {
    Alert.alert("Error loading party posts");
  }
};

export const getCachedPosts = async (): Promise<IPost[] | null> => {
  try {
    const serializedPosts = await AsyncStorage.getItem(cacheKey);

    if (serializedPosts) {
      const cachedPosts: IPost[] = JSON.parse(serializedPosts);
      return cachedPosts.map((post) => ({
        ...post,
        createdAt: post.createdAt ? new Date(post.createdAt) : null,
      }));
    }
  } catch (error) {
    Alert.alert("Error loading party posts");
  }

  return null;
};

export const removeCachedPartyScreen = async () => {
  try {
    await AsyncStorage.removeItem(cacheKey);
  } catch (error) {
    Alert.alert("Can't delete party posts.");
  }
};

export async function cacheJoinedAt(date: string) {
  await AsyncStorage.setItem(joinedAtKey, date);
}
export async function removeCacheJoinedAt() {
  await AsyncStorage.removeItem(joinedAtKey);
}
