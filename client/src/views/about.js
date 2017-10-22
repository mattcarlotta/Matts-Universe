import React from 'react';
import aboutImage from '../images/aboutViewImage.png';

const About = () => {
	return (
		<div className="about-container">
			<div className="about-content text-center">
				<h1>What I create.</h1>
				<p>
					Melding two passions of commercial illustration with programming in
					several different languages,
					<br />
					I develop standalone and web applications across multiple platforms.
				</p>
				<div className="underline">
					<hr />
				</div>
				<div className="about-body">
					<img src={aboutImage} alt="aboutImage.png" />
				</div>
			</div>
		</div>
	);
};

export default About;