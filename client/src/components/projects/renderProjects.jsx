import React from 'react';

const RenderProjects = ({ image, title, imgtitle, description }) => {
	return (
		<div className="content">
			<img src={process.env.REACT_APP_API + image.path} alt={image.name} />
			<h2>
				{title}
			</h2>
			<h3>
				{imgtitle}
			</h3>
			<h4>
				{description}
			</h4>
		</div>
	);
};

export default RenderProjects;
