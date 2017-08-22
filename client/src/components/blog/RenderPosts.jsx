import React from 'react';
import { Link, browserHistory } from 'react-router';

const RenderPosts = props => {
	return (
		<div className="post-container">
			<h2 className="entry-title">
				{props.title}
			</h2>
			<h3 className="entry-date">
				{props.timestamp}
			</h3>
			{props.image
				? <div className="entry-image">
						<img src={props.image} alt="" />
					</div>
				: null}
			<p className="img-title">
				<em>
					{props.imgtitle}
				</em>
			</p>
			<div className="entry-content m-t">
				{props.description.split('\n').map((item, key) => {
					return (
						<p key={key}>
							{item}
							<br />
						</p>
					);
				})}
			</div>
			{!props.singlePageIsLoaded
				? <div className="entry-link m-t">
						<Link
							onClick={() =>
								browserHistory.push({
									pathname: `/blog/post/title`,
									query: { postId: `${props.navTitle}` }
								})}
						>
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
