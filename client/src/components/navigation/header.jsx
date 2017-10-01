import map from 'lodash/map';
import React from 'react';
import { Link, browserHistory, withRouter } from 'react-router';

import NAVSCROLLITEMS from './data/navScrollToIndexData.jsx';
import NavScrollToIndex from './navScrollToIndex.jsx';
import SignOut from '../../containers/auth/signout';

const Header = () => {
	return (
		<nav className="navigation-container">
			<ul className="navigation-bar">
				{map(NAVSCROLLITEMS, ({ pixel, icon, title }, key) => {
					return (
						<NavScrollToIndex
							key={key}
							pixel={pixel}
							icon={icon}
							title={title}
						/>
					);
				})}
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
				<NavScrollToIndex pixel={2260} icon="fa-envelope" title="Contact" />
				<SignOut />
			</ul>
		</nav>
	);
};

export default withRouter(Header);

/*
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
*/
