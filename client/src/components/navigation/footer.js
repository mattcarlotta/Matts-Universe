import React from 'react';
import { Link } from 'react-router';

const Footer = () => {
	return (
		<div className="footer-container">
			<ul className="contact-nav">
				<li>
					<p>©2017 Matt Carlotta</p>
				</li>
				<li>
					<Link>
						<i className="fa fa-envelope" rel="noopener noreferrer" target="_blank" />
						{window.innerWidth < 650 ? '' : 'carlotta.matt@gmail.com'}
					</Link>
				</li>
				<li>
					<a href="https://github.com/mattcarlotta" rel="noopener noreferrer" target="_blank">
						<i className="fa fa-github" aria-hidden="true" />
						{window.innerWidth < 650 ? '' : 'Github'}
					</a>
				</li>
				<li>
					<a href="https://www.linkedin.com/in/mattcarlotta/" rel="noopener noreferrer" target="_blank">
						<i className="fa fa-linkedin-square" aria-hidden="true" />
						{window.innerWidth < 650 ? '' : 'Linkedin'}
					</a>
				</li>
			</ul>
		</div>
	);
};

export default Footer;
