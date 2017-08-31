import React from 'react';

import BlogPagination from '../components/blog/BlogPagination';

const ShowBlog = () => {
	return (
		<div className="blog-container col-xs-12">
			<h1 className="title">Blog</h1>
			<BlogPagination />
		</div>
	);
};

export default ShowBlog;