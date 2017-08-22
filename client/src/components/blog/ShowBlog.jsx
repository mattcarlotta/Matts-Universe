import React from 'react';

import BlogPagination from './BlogPagination';

const ShowBlog = props => {
	return (
		<div className="blog-container col-xs-12">
			<h1 className="title">Blog</h1>
			<BlogPagination />
		</div>
	);
};

export default ShowBlog;
