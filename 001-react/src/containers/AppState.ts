import {SubRedditService} from '../services/SubRedditService';
import AppState, {PostsBySubreddit} from './AppTypes';

export const SUBREDDIT_LIST = ['reactjs', 'frontend'];

export const  selectPosts = (state: AppState, subReddit: string = state.currentSubReddit) => {
    return state.postsBySubReddit[subReddit];
  };

export const selectSubReddit = (state: AppState, selectedSubReddit: string): AppState => {
  if (selectedSubReddit === state.currentSubReddit) {
    return state;
  }
  return {
    ...state,
    currentSubReddit: selectedSubReddit,
    needsUpdate: true
  };
};

const receivePosts = (state: AppState) => (subRedditService: SubRedditService): [AppState, SubRedditService] => {
  return [{
    ...state,
    postsBySubReddit: {
      ...state.postsBySubReddit,
      [state.currentSubReddit]: {
        ...selectPosts(state),
        isFetching: subRedditService.isFetching(),
        lastUpdated: subRedditService.getLastUpdated(),
        items: subRedditService.getPosts(),
      },
    }
  }, subRedditService];
};

export const fetchPosts = (state: AppState, subRedditService: SubRedditService): Promise<[AppState, SubRedditService]> => {
  return subRedditService.fetchPosts().then(receivePosts(state));
};

export const invalidateSubReddit = (state: AppState): AppState => {
  return {
    ...state,
    postsBySubReddit: {
      ...state.postsBySubReddit,
      [state.currentSubReddit]: {
        ...selectPosts(state),
        didInvalidate: true
      }
    }
  };
};

export const requestPosts = (state: AppState, subRedditService: SubRedditService): [AppState, SubRedditService] => {
  const newSubRedditService = subRedditService.requestPosts(selectPosts(state).didInvalidate);
  return [{
    ...state,
    needsUpdate: false,
    postsBySubReddit: {
      ...state.postsBySubReddit,
      [state.currentSubReddit]: {
        ...selectPosts(state),
        isFetching: newSubRedditService.isFetching(),
        didInvalidate: false
      }
    }
  }, newSubRedditService];
};

export const createInitialState = (subRedditList: string[], initialSubReddit: string): AppState => {
  return {
    postsBySubReddit: createInitialPostsBySubReddit(subRedditList),
    currentSubReddit: initialSubReddit,
    needsUpdate: false
  };
};

const createInitialPostsBySubReddit = (subRedditList: string[]) => {
  return subRedditList.reduce(
    (posts, subReddit) => {
      posts[subReddit] = {
        isFetching: false,
        didInvalidate: false,
        items: [],
      };
      return posts;
    }, {} as PostsBySubreddit,
  );
};



export default {
  createInitialState,
  requestPosts,
  invalidateSubReddit,
  fetchPosts,
  selectSubReddit,
  selectPosts
};

