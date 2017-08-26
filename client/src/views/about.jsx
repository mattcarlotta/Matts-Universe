import React from 'react';

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
						<img src={require('../images/aboutImage4.png')} alt="" />
					</div>
				</div>
			</center>
		</div>
	);
};

export default About;
