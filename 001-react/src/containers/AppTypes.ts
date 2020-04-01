import {SubRedditService} from '../services/SubRedditService';

export type SubRedditServices = {
  [name: string]: SubRedditService
}

export type SubRedditPosts = {
  isFetching: boolean
  didInvalidate: boolean
  lastUpdated?: number
  items: any[]
}

export type PostsBySubreddit = {
  [name: string]: SubRedditPosts
}

export type AppState = {
  postsBySubReddit: PostsBySubreddit
  currentSubReddit: string
  needsUpdate: boolean
}

export default AppState;
