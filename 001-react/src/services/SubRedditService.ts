import {SubRedditServices} from '../containers/AppTypes';

export interface SubRedditService {
  isFetching(): boolean
  requestPosts(invalidate: boolean): SubRedditService
  fetchPosts(): Promise<SubRedditService>
  getPosts(): string[]
  getLastUpdated(): number
  invalidate(): SubRedditService
}

class SubRedditServiceImpl implements SubRedditService {
  private readonly subReddit: string;
  private readonly lastUpdated: number;
  private readonly posts: string[] = [];
  private readonly fetchPromise: Promise<string[]> | null = null;

  constructor(subReddit: string,
              lastUpdated = 0,
              posts: string[] = [],
              fetchPromise: Promise<string[]> | null = null) {
    this.subReddit = subReddit;
    this.lastUpdated = lastUpdated;
    this.posts = posts;
    this.fetchPromise = fetchPromise;
  }

  private shouldFetchPosts(invalidate: boolean) {
    if (!this.posts) {
      return true;
    }
    if (this.fetchPromise === null) {
      return true;
    }
    return invalidate;
  };

  private fetchPostsExternally(): Promise<string[]> {
    return fetch(`https://www.reddit.com/r/${this.subReddit}.json`)
    .then(response => response.json())
    .then(json => json.data.children.map((child: any) => child.data).map((entry: any) => entry.title));
  };

  requestPosts(invalidate: boolean): SubRedditService {
    if (this.shouldFetchPosts(invalidate)) {
      return new SubRedditServiceImpl(this.subReddit, this.lastUpdated, this.posts, this.fetchPostsExternally());
    }
    return this;
  };

  fetchPosts(): Promise<SubRedditService> {
    if (this.fetchPromise === null) {
      return Promise.resolve(this);
    }
    return this.fetchPromise.then(posts => (new SubRedditServiceImpl(this.subReddit, Date.now(), posts)));
  };

  getPosts() {
    return this.posts;
  };

  invalidate() {
    return {...this, didInvalidate: true};
  };

  getLastUpdated() {
    return this.lastUpdated;
  };

  isFetching(): boolean {
    return this.fetchPromise !== null;
  };
}

const SubRedditServiceFactory = {
  create: (subReddit: string): SubRedditService => {
    return new SubRedditServiceImpl(subReddit);
  },
  createServices: (subRedditList: string[]) => {
    return subRedditList.reduce(
      (services, subReddit) => {
        services[subReddit] = SubRedditServiceFactory.create(subReddit);
        return services;
      }, {} as SubRedditServices,
    );
  }
};

export default SubRedditServiceFactory;
