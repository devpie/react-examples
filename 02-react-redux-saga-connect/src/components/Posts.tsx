import React from 'react';

export type PostsProps = {
  posts: any[]
}

const Posts = ({posts}: PostsProps) => (
  <ul>
    {posts.map((post, i) =>
      <li key={i}>{post.title}</li>,
    )}
  </ul>
);

export default Posts;
