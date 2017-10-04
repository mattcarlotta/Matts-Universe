import map from 'lodash/map';
import React from 'react';
import { Link, browserHistory } from 'react-router';
import { animateScroll as Nav } from 'react-scroll';

import NAVSCROLLITEMS from './data/navScrollToIndexData.jsx';
import NavScrollTo from './navScrollTo.jsx';
import SignOut from '../../containers/auth/signout';

const Header = ({ fixedNavBar }) => {
	return (
		<div className={fixedNavBar ? 'fixed-nav' : null}>
			<nav className="navigation-container">
				<ul className="navigation-bar">
					{map(NAVSCROLLITEMS, ({ pixel, icon, title }, key) => {
						return (
							<NavScrollTo key={key} pixel={pixel} icon={icon} title={title} />
						);
					})}
					<li>
						<Link
							onClick={() =>
								browserHistory.push({
									pathname: `/blog/page`,
									query: { pageId: 1 }
								})}
						>
							<i className="fa fa-commenting-o" aria-hidden="true" />
							Blog
						</Link>
					</li>
					<li>
						<Link onClick={() => Nav.scrollToBottom()}>
							<i className="fa fa-envelope-o" aria-hidden="true" /> Contact
						</Link>
					</li>
					<SignOut />
				</ul>
			</nav>
		</div>
	);
};

export default Header;
