import React from 'react';

import Projects from '../containers/projects/Projects';

const ShowProjects = () => {
	return (
		<div className="project-container">
			<h1>What I've developed.</h1>
			<div className="project-content">
				<Projects />
			</div>
		</div>
	);
};

export default ShowProjects;
