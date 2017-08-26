import React from 'react';
import { Link } from 'react-router';

const Footer = () => {
	return (
		<div className="footer-container">
			<ul className="contact-nav">
				<li className="link-centered">
					<p>©2017 Matt Carlotta</p>
				</li>
				<li className="link-centered">
					<Link>
						<i
							className="fa fa-envelope"
							aria-hidden="true"
						/>carlotta.matt@gmail.com
					</Link>
				</li>
				<li className="link-centered">
					<a href="https://github.com/mattcarlotta">
						<i className="fa fa-github" aria-hidden="true" />Github
					</a>
				</li>
				<li className="link-centered">
					<a href="https://www.linkedin.com/in/mattcarlotta/">
						<i className="fa fa-linkedin-square" aria-hidden="true" />Linkedin
					</a>
				</li>
			</ul>
		</div>
	);
};

export default Footer;
