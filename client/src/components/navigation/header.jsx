import React from 'react';
import { browserHistory } from 'react-router';

import NavScrollTo from './navScrollTo';
import SignOut from '../../containers/auth/signout';

const Header = () => {
	return (
		<nav className="navigation-container">
			<ul className="navigation-bar">
				<NavScrollTo pixel={1000} icon="fa-question-circle-o" title="About" />
				<NavScrollTo pixel={2000} icon="fa-cogs" title="Projects" />
				<li>
					<a
						onClick={() =>
							browserHistory.push({
								pathname: `/blog/page`,
								query: { pageId: 1 }
							})}>
						<i className="fa fa-commenting-o" aria-hidden="true" />
						Blog
					</a>
				</li>
				<NavScrollTo pixel={2260} icon="fa-envelope" title="Contact" />
				<SignOut />
			</ul>
		</nav>
	);
};

export default Header;
