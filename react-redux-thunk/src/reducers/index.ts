import {combineReducers} from 'redux';
import {
  INVALIDATE_SUBREDDIT,
  RECEIVE_POSTS,
  REQUEST_POSTS,
  SELECT_SUBREDDIT,
  SelectSubredditAction,
  SubredditPostsAction,
} from '../actions';

const selectedSubreddit = (state = 'reactjs', action: SelectSubredditAction) => {
  switch (action.type) {
    case SELECT_SUBREDDIT:
      return action.subreddit;
    default:
      return state;
  }
};

const posts = (state: SubredditPosts = {
  isFetching: false,
  didInvalidate: false,
  items: [],
}, action: SubredditPostsAction) => {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
      return {
        ...state,
        didInvalidate: true,
      };
    case REQUEST_POSTS:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false,
      };
    case RECEIVE_POSTS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: action.posts,
        lastUpdated: action.receivedAt,
      };
    default:
      return state;
  }
};

interface SubredditPosts {
  isFetching: boolean,
  didInvalidate: boolean,
  lastUpdated?: number,
  items: any[]
}

interface PostsBySubreddit {
  [name: string]: SubredditPosts
}

const postsBySubreddit = (state: PostsBySubreddit = {}, action: SubredditPostsAction) => {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
    case RECEIVE_POSTS:
    case REQUEST_POSTS:
      return {
        ...state,
        [action.subreddit]: posts(state[action.subreddit], action),
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  postsBySubreddit,
  selectedSubreddit,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
