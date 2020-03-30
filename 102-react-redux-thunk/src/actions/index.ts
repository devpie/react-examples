import {AnyAction} from 'redux';
import {RootState} from '../reducers';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';

export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT';
export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT';

export interface SelectSubredditAction {
  type: typeof SELECT_SUBREDDIT,
  subreddit: string
}

export interface InvalidateSubredditAction {
  type: typeof INVALIDATE_SUBREDDIT,
  subreddit: string
}

export interface RequestPostsAction {
  type: typeof REQUEST_POSTS,
  subreddit: string
}

export interface ReceivePostsAction {
  type: typeof RECEIVE_POSTS,
  subreddit: string,
  posts: any[],
  receivedAt: number
}

export type SubredditPostsAction = InvalidateSubredditAction | RequestPostsAction | ReceivePostsAction;

export const selectSubreddit = (subreddit: string): SelectSubredditAction => ({
  type: SELECT_SUBREDDIT,
  subreddit,
});

export const invalidateSubreddit = (subreddit: string): InvalidateSubredditAction => ({
  type: INVALIDATE_SUBREDDIT,
  subreddit,
});

export const requestPosts = (subreddit: string): RequestPostsAction => ({
  type: REQUEST_POSTS,
  subreddit,
});

export const receivePosts = (subreddit: string, json: any): ReceivePostsAction => ({
  type: RECEIVE_POSTS,
  subreddit,
  posts: json.data.children.map((child: any) => child.data),
  receivedAt: Date.now(),
});

export type FetchPostsAction = ThunkAction<Promise<ReceivePostsAction>, RootState, any, AnyAction>

const fetchPosts = (subreddit: string): FetchPostsAction => (dispatch) => {
  dispatch(requestPosts(subreddit));
  return fetch(`https://www.reddit.com/r/${subreddit}.json`)
  .then(response => response.json())
  .then(json => dispatch(receivePosts(subreddit, json)));
};

const shouldFetchPosts = (state: RootState, subreddit: string) => {
  const posts = state.postsBySubreddit[subreddit];
  if (!posts) {
    return true;
  }
  if (posts.isFetching) {
    return false;
  }
  return posts.didInvalidate;
};

export type FetchPostsIfNeededAction = ThunkAction<void, RootState, any, AnyAction>;
export type RootThunkDispatch = ThunkDispatch<RootState,any,AnyAction>;

export const fetchPostsIfNeeded =
  (subreddit: string): FetchPostsIfNeededAction => (dispatch: RootThunkDispatch, getState): void => {
  if (shouldFetchPosts(getState(), subreddit)) {
    dispatch(fetchPosts(subreddit));
  }
};
