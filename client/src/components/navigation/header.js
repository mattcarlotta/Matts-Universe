import React from 'react';
import { Link, browserHistory } from 'react-router';

import ResizeWindowOnChange from '../app/ResizeWindowOnChange'
import SignOut from '../../containers/auth/signout';

const Header = () => (
	<nav className="navigation-container">
		<ul className="navigation-bar">
			<li>
				<Link onClick={() => browserHistory.push('/')} >
					<i className="material-icons">home</i>
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
					<i className="material-icons">forum</i>
					{window.innerWidth < 650 ? '' : 'Blog'}
				</Link>
			</li>
			<li>
				<a href="http:///www.mattcarlotta.blogspot.com" rel="noopener noreferrer" target="_blank">
					<i className="material-icons">work</i>
					{window.innerWidth < 650 ? '' : 'Portfolio'}
				</a>
			</li>
			<SignOut window={window.innerWidth} />
		</ul>
	</nav>
);

export default ResizeWindowOnChange(Header);
