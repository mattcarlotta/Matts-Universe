import React from 'react';
import { Link, browserHistory } from 'react-router';
import { animateScroll as Nav } from 'react-scroll';

import SignOut from '../../containers/auth/signout';

const Header = () => {
	return (
		<nav className="navigation-container">
			<ul className="navigation-bar">
				<li>
					<a
						onClick={() =>
							Nav.scrollTo(1000, { duration: 1150, smooth: 'easeInOutQuint' })}>
						<i className="fa fa-question-circle-o" aria-hidden="true" /> About
					</a>
				</li>
				<li>
					<a
						onClick={() =>
							Nav.scrollTo(2000, { duration: 1150, smooth: 'easeInOutQuint' })}>
						<i className="fa fa-cogs" aria-hidden="true" /> Projects
					</a>
				</li>
				<li>
					<Link
						onClick={() =>
							browserHistory.push({
								pathname: `/blog/page`,
								query: { pageId: 1 }
							})}>
						<i className="fa fa-commenting-o" aria-hidden="true" />
						Blog
					</Link>
				</li>
				<li>
					<a
						onClick={() =>
							Nav.scrollTo(2120, { duration: 1150, smooth: 'easeInOutQuint' })}>
						<i className="fa fa-envelope" aria-hidden="true" /> Contact
					</a>
				</li>
				<SignOut />
			</ul>
		</nav>
	);
};

export default Header;
