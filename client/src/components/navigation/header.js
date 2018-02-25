import map from 'lodash/map';
import React from 'react';
import { Link, browserHistory } from 'react-router';

import NAVLINKS from './links/headerLinks';
import SignOut from '../../containers/auth/signout';

export default ({setScrollHeight}) => (
	<nav className="navigation-container">
		<ul className="navigation-bar">
			{map(NAVLINKS, ({ icon, pixel, pathname, query, title}) => (
				<li key={icon}>
					<Link
						onClick={() => {
							browserHistory.push({pathname, query});
							pixel && window.setTimeout(() => setScrollHeight(pixel), 100);
							}
						}
					>
						<i className="material-icons">{icon}</i>
						<span className="header-title">{title}</span>
					</Link>
				</li>
			))}
			<li>
				<a href="http:///www.mattcarlotta.blogspot.com" rel="noopener noreferrer" target="_blank">
					<i className="material-icons">work</i>
					<span className="header-title">Portfolio</span>
				</a>
			</li>
			<SignOut />
		</ul>
	</nav>
)
