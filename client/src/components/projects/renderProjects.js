import React from 'react';

export default ({ image, title, imgtitle, description, githubLink }) => (
	<div className="content">
		<img src={image.apiURL} alt={image.name} />
		<h2>{title}</h2>
		<h3>{imgtitle}</h3>
		<h4>{description}</h4>
		{githubLink && <a href={githubLink} rel="noopener noreferrer" target="_blank"><i className="fa fa-github"/>View source code</a> }
	</div>
);
