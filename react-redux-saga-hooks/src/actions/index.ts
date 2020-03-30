
export const REQUEST_POSTS = 'REQUEST_POSTS';
export const FETCH_POSTS = 'FETCH_POSTS';
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

export interface FetchPostsAction {
  type: typeof FETCH_POSTS,
  subreddit: string
}

export interface ReceivePostsAction {
  type: typeof RECEIVE_POSTS,
  subreddit: string,
  posts: any[],
  receivedAt: number
}

export type SubredditPostsAction = InvalidateSubredditAction | FetchPostsAction | ReceivePostsAction;

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

export const fetchPosts = (subreddit: string): FetchPostsAction => ({
  type: FETCH_POSTS,
  subreddit,
});

export const receivePosts = (subreddit: string, json: any): ReceivePostsAction => ({
  type: RECEIVE_POSTS,
  subreddit,
  posts: json.data.children.map((child: any) => child.data),
  receivedAt: Date.now(),
});
