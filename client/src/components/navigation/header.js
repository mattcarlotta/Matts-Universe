import React from 'react';
import { Link, browserHistory } from 'react-router';

import SignOut from '../../containers/auth/signout';

const Header = () => (
	<nav className="navigation-container">
		<ul className="navigation-bar">
			<li>
				<Link onClick={() => browserHistory.push('/')} >
					<i className="fa fa-home" aria-hidden="true" />
					{window.innerWidth < 650 ? '' : 'Home'}
				</Link>
			</li>
			<li>
				<Link
					onClick={() =>
						browserHistory.push({
							pathname: `/blog/page`,
							query: { pageId: 1 }
						})}
				>
					<i className="fa fa-comments" aria-hidden="true" />
					{window.innerWidth < 650 ? '' : 'Blog'}
				</Link>
			</li>
			<li>
				<a href="http:///www.mattcarlotta.blogspot.com" rel="noopener noreferrer" target="_blank">
					<i className="fa fa-briefcase" aria-hidden="true" />
					{window.innerWidth < 650 ? '' : 'Portfolio'}
				</a>
			</li>
			<SignOut />
		</ul>
	</nav>
);

export default Header;
