import React, {Component} from 'react';
import Picker from '../components/Picker';
import Posts from '../components/Posts';
import SubRedditServiceFactory, {SubRedditService} from '../services/SubRedditService';
import {createInitialState, requestPosts, fetchPosts, SUBREDDIT_LIST, selectSubReddit, invalidateSubReddit, selectPosts} from './AppState';
import AppState from './AppTypes';


class App extends Component<{}, AppState> {

  private subRedditServices = SubRedditServiceFactory.createServices(SUBREDDIT_LIST);
  state = createInitialState(SUBREDDIT_LIST, SUBREDDIT_LIST[0]);

  private selectService(state: AppState) {
    return this.subRedditServices[state.currentSubReddit];
  }

  private setService = (state: AppState, subRedditService: SubRedditService) => {
    return this.subRedditServices[state.currentSubReddit] = subRedditService;
  };

  private requestPosts = (state: AppState) => {
    const [newState, newService] = requestPosts(state, this.selectService(state));
    this.setService(newState, newService);
    return newState;
  };

  private updateState = (stateAndSubRedditService: [AppState, SubRedditService]) => {
    this.setService(stateAndSubRedditService[0], stateAndSubRedditService[1]);
    this.setState(stateAndSubRedditService[0])
  };

  private fetchPosts = (): void => {
    const state = this.state;
    fetchPosts(state, this.selectService(state)).then(this.updateState);
  };

  componentDidMount() {
    this.setState(this.requestPosts, this.fetchPosts);
  }

  componentDidUpdate(prevProps: any) {
    if(this.state.needsUpdate) {
      this.setState(this.requestPosts, this.fetchPosts);
    }
  }

  setCurrentSubReddit = (currentSubReddit: string) =>
    this.setState(state => selectSubReddit(state, currentSubReddit));

  refresh = (e: any) => {
    e.preventDefault();
    this.setState(invalidateSubReddit);
    this.setState(this.requestPosts, this.fetchPosts);
  };

  render() {
    const {isFetching, items, lastUpdated} = selectPosts(this.state);
    const isEmpty = items.length === 0;
    return (
      <div>
        <Picker
          value={this.state.currentSubReddit}
          onChange={this.setCurrentSubReddit}
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
          <button onClick={this.refresh}>
            Refresh
          </button>
          }
        </p>
        {isEmpty
          ? (isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
          : <div style={{opacity: isFetching ? 0.5 : 1}}>
            <Posts posts={items}/>
          </div>
        }
      </div>
    );
  }
}

export default App;
