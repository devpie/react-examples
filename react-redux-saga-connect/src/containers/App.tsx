import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {invalidateSubreddit, requestPosts, selectSubreddit} from '../actions';
import Picker from '../components/Picker';
import Posts from '../components/Posts';
import {RootState} from '../reducers';

type AppProps = {
  selectedSubreddit: string,
  posts: any[],
  isFetching: boolean,
  lastUpdated?: number,
  dispatch: Dispatch
}

class App extends Component<AppProps, RootState> {

  componentDidMount() {
    const {dispatch, selectedSubreddit} = this.props;
    dispatch(requestPosts(selectedSubreddit));
  }

  componentDidUpdate(prevProps: any) {
    if (prevProps.selectedSubreddit !== this.props.selectedSubreddit) {
      const {dispatch, selectedSubreddit} = this.props;
      dispatch(requestPosts(selectedSubreddit));
    }
  }

  handleChange = (nextSubreddit: string) => {
    this.props.dispatch(selectSubreddit(nextSubreddit));
  };

  handleRefreshClick = (e: any) => {
    e.preventDefault();

    const {dispatch, selectedSubreddit} = this.props;
    dispatch(invalidateSubreddit(selectedSubreddit));
    dispatch(requestPosts(selectedSubreddit));
  };

  render() {
    const {selectedSubreddit, posts, isFetching, lastUpdated} = this.props;
    const isEmpty = posts.length === 0;
    return (
      <div>
        <Picker
          value={selectedSubreddit}
          onChange={this.handleChange}
          options={['reactjs', 'frontend']}
        />
        <p>
          {lastUpdated &&
          <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
            {' '}
            </span>
          }
          {!isFetching &&
          <button onClick={this.handleRefreshClick}>
            Refresh
          </button>
          }
        </p>
        {isEmpty
          ? (isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
          : <div style={{opacity: isFetching ? 0.5 : 1}}>
            <Posts posts={posts}/>
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const {selectedSubreddit, postsBySubreddit} = state;
  const {
    isFetching,
    lastUpdated,
    items: posts,
  } = postsBySubreddit[selectedSubreddit] || {
    isFetching: true,
    items: [],
  };

  return {
    selectedSubreddit,
    posts,
    isFetching,
    lastUpdated,
  };
};



export default connect(mapStateToProps)(App);
