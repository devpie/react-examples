import React from 'react';

export type PostsProps = {
  posts: string[]
}

const Posts = ({posts}: PostsProps) => (
  <ul>
    {posts.map((post, i) =>
      <li key={i}>{post}</li>,
    )}
  </ul>
);

export default Posts;
