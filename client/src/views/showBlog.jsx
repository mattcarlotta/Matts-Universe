import React from 'react';

import BlogHeader from '../components/blog/blogHeader';
import BlogPagination from '../components/blog/BlogPagination';

const ShowBlog = () => {
	return (
		<div className="blog-container col-xs-12">
			<BlogHeader />
			<BlogPagination />
		</div>
	);
};

export default ShowBlog;
