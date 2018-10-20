import React from 'react';
import blogImage from '../../../images/blogViewImage.png';
import { title } from './blogHeader.scss';

export default () => (
  <div className={title}>
    <img src={blogImage} width="200px" alt="blogImage.png" />
    <h1>My Blog</h1>
    <p>
      <em>
        {`
          A collection of thoughts and ideas, how to's and life events.
        `}
      </em>
    </p>
    <hr />
  </div>
);
