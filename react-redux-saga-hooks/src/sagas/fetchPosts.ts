import {call, put, select, takeEvery} from 'redux-saga/effects';
import {fetchPosts as fetchPostsAction, receivePosts, REQUEST_POSTS, RequestPostsAction} from '../actions';
import {RootState} from '../reducers';

const fetchPosts = (subreddit: string) => {
  return fetch(`https://www.reddit.com/r/${subreddit}.json`)
  .then(response => response.json());
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

function* fetchPosts2(action: RequestPostsAction) {
  try {
    const json = yield call(fetchPosts, action.subreddit);
    yield put(receivePosts(action.subreddit, json));
  } catch (e) {
    //yield put({type: "USER_FETCH_FAILED", message: e.message});
  }
}

function* fetchPostsIfNeeded(action: RequestPostsAction) {
  const state: RootState = yield select();
  if (shouldFetchPosts(state, action.subreddit)) {
    yield put(fetchPostsAction(action.subreddit))
    yield fetchPosts2(action);
  }
}

function* fetchPostsSaga() {
  yield takeEvery(REQUEST_POSTS, fetchPostsIfNeeded);
}

export default fetchPostsSaga;
