import React from 'react';

import BlogHeader from '../components/blog/blogHeader';
import BlogPagination from '../containers/blog/BlogPagination';

export default () => (
	<div className="blog-container col-xs-12">
		<BlogHeader />
		<BlogPagination />
	</div>
);
