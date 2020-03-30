import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {invalidateSubreddit, requestPosts, selectSubreddit} from '../actions';
import Picker from '../components/Picker';
import Posts from '../components/Posts';
import {RootState} from '../reducers';

const SUBREDDIT_LIST = ['reactjs', 'frontend'];
const getSelectedSubreddit = (state: RootState) => state.selectedSubreddit;
const getSubreddit = (selectedSubreddit: string) => (state: RootState) => (
  state.postsBySubreddit[selectedSubreddit]
);

const App = () => {
  const dispatch = useDispatch();
  const selectedSubreddit = useSelector(getSelectedSubreddit);
  dispatch(requestPosts(selectedSubreddit));

  const handleChange = (nextSubreddit: string) => {
    dispatch(selectSubreddit(nextSubreddit));
  };

  const handleRefreshClick = (e: any) => {
    e.preventDefault();
    dispatch(invalidateSubreddit(selectedSubreddit));
  };

  const {isFetching, lastUpdated, items} = useSelector(getSubreddit(selectedSubreddit));
  const isEmpty = items.length === 0;

  return (
    <div>
      <Picker
        onChange={handleChange}
        options={SUBREDDIT_LIST}
      />
      <p>
        {lastUpdated &&
        <span>
            Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
          {' '}
          </span>
        }
        {!isFetching &&
        <button onClick={handleRefreshClick}>
          Refresh
        </button>
        }
      </p>
      {isEmpty
        ? (isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
        : <div style={{opacity: isFetching ? 0.5 : 1}}>
          <Posts/>
        </div>
      }
    </div>
  );
};

export default App;
