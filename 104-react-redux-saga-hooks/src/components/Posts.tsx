import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../reducers';

export type PostsProps = {
  posts: any[]
}

const getPosts = (state: RootState) => {
  const subreddit = state.selectedSubreddit;
  return subreddit ? state.postsBySubreddit[subreddit].items || [] : [];
};

const Posts = () => {
  const posts = useSelector(getPosts);
  return (
    <ul>
      {posts.map((post, i) =>
        <li key={i}>{post.title}</li>,
      )}
    </ul>
  );
};

export default Posts;
