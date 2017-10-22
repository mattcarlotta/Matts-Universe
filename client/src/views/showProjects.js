import React from 'react';

import Projects from '../containers/projects/Projects';

const ShowProjects = () => {
	return (
		<div className="project-container">
			<div className="title">
				<h1>What I've developed.</h1>
				<p>
					A slideshow of projects I've created starting with the most recent and
					going as far back <br /> as late 2016.
				</p>
			</div>
			<div className="project-content">
				<Projects />
			</div>
		</div>
	);
};

export default ShowProjects;
