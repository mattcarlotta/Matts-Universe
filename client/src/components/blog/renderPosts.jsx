import _ from 'lodash';
import React from 'react';
import { Link, browserHistory } from 'react-router';

const RenderPosts = ({
	title,
	timestamp,
	image,
	imgtitle,
	description,
	singlePageIsLoaded,
	navTitle
}) => {
	return (
		<div className="post-container">
			<h2 className="entry-title">
				{title}
			</h2>
			<h3 className="entry-date">
				{timestamp}
			</h3>
			{image
				? <div className="entry-image">
						<img src={image} alt="" />
					</div>
				: null}
			<p className="img-title">
				<em>
					{imgtitle}
				</em>
			</p>
			<div className="entry-content m-t">
				{_.split(description, '\n').map((item, key) => {
					return (
						<p key={key}>
							{item}
							<br />
						</p>
					);
				})}
			</div>
			{!singlePageIsLoaded
				? <div className="entry-link m-t">
						<Link
							onClick={() =>
								browserHistory.push({
									pathname: `/blog/post/title`,
									query: { postId: `${navTitle}` }
								})}>
							<i
								className="fa fa-long-arrow-right"
								aria-hidden="true"
							/>Continue reading
						</Link>
					</div>
				: null}
			<hr />
		</div>
	);
};

export default RenderPosts;
