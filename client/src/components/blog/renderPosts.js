import split from 'lodash/split';
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
}) => (
	<div className="post-container">
		<h2 className="entry-title">{title}</h2>
		<h3 className="entry-date">{timestamp}</h3>
		{image
			? <div className="entry-image">
					<img src={image.apiURL} alt={image.name} />
				</div>
		 	: null
		}
		<p className="img-title">
			<em>{imgtitle}</em>
		</p>
		<div className="entry-content">
			{split(description, '\n').map((postDescription, key) => (
					<p key={key}>
						{postDescription}
						<br />
					</p>
			))}
		</div>
		{!singlePageIsLoaded && description.length >= 497
			? <div className="entry-link">
					<Link
						onClick={() =>
							browserHistory.push({
								pathname: `/blog/post/title`,
								query: { postId: `${navTitle}` }
							})
						}
					>
						<i className="fa fa-long-arrow-right" aria-hidden="true" />Continue
						reading
					</Link>
				</div>
		 	: null
		}
		<hr />
	</div>
);

export default RenderPosts;
