import React from 'react';
import aboutImage from '../images/aboutViewImage.png';

const About = () => {
	return (
		<div className="about-container">
			<center className="about-content text-center">
				<div>
					<h1>What I create.</h1>
					<p>
						Melding two passions of commercial illustration with programming in
						several languages,
						<br />
						I develop standalone and web applications across multiple platforms.
					</p>
					<div className="underline">
						<hr />
					</div>
					<div className="about-body">
						<img src={aboutImage} alt="" />
					</div>
				</div>
			</center>
		</div>
	);
};

export default About;
