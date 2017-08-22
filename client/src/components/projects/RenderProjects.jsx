import React from 'react';

const RenderProjects = props => {
	return (
		<div className="content">
			<img src={props.image} alt="" />
			<h2>
				{props.title}
			</h2>
			<h3>
				{props.imgtitle}
			</h3>
			<h4>
				{props.description}
			</h4>
		</div>
	);
};

export default RenderProjects;
