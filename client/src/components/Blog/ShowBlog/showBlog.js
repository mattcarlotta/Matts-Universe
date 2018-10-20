import React from 'react';
import BlogHeader from '../BlogHeader/blogHeader';
import BlogPagination from '../containers/Blog/BlogPagination/BlogPagination';
import { blogContainer } from '../../../styles/index.scss';

export default () => (
  <div className={`${blogContainer} col-xs-12`}>
    <BlogHeader />
    <BlogPagination />
  </div>
);
