import map from 'lodash/map';
import React from 'react';
import FOOTERLINKS from './links/footerLinks';
import ResizeWindowOnChange from '../app/ResizeWindowOnChange';

export default ResizeWindowOnChange(() => (
	<div className="footer-container">
		<ul className="contact-nav">
			<li>
				<p>©2017 Matt Carlotta</p>
			</li>
			{map(FOOTERLINKS, ({ icon, link, title }) => (
				<li key={title}>
					<a href={link} rel="noopener noreferrer" target="_blank">
						<i className={`fa ${icon}`} rel="noopener noreferrer" target="_blank" />
						{window.innerWidth < 650 ? '' : title }
					</a>
				</li>
			))}
		</ul>
	</div>
))
