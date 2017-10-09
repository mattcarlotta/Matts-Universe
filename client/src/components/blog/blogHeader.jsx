import React from 'react';

import blogImage from '../../images/blogViewImage.png';

const BlogHeader = () => {
	return (
		<div className="title">
			<img src={blogImage} width="200px" alt="blogImage.png" />
			<h1>My Blog</h1>
			<p>
				<em>A collection of thoughts and ideas, how to's and life events.</em>
			</p>
			<hr />
		</div>
	);
};

export default BlogHeader;
