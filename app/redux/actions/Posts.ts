import { IPost } from "./../../screens/Party/components/PostFlatlist/types";
// partyScreenActions.ts
export const SET_POSTS = "SET_POSTS";

interface SetPostsAction {
  type: typeof SET_POSTS;
  payload: IPost[];
}

export type PartyScreenActionTypes = SetPostsAction;

export const setPosts = (posts: IPost[]): PartyScreenActionTypes => ({
  type: SET_POSTS,
  payload: posts,
});
