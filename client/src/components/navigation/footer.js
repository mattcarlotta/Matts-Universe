import map from 'lodash/map';
import React from 'react';
import FOOTERLINKS from './links/footerLinks';

export default () => (
	<div className="footer-container">
		<ul className="contact-nav">
			<li>
				<p>©2017 Matt Carlotta</p>
			</li>
			{map(FOOTERLINKS, ({ icon, link, title }) => (
				<li key={title}>
					<a href={link} rel="noopener noreferrer" target="_blank">
						<i className={`fa ${icon}`} rel="noopener noreferrer" target="_blank" />
						<span className="footer-title">{title}</span>
					</a>
				</li>
			))}
		</ul>
	</div>
)
