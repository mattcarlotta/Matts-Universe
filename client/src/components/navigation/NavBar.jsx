import map from 'lodash/map';
import React from 'react';
import { Link, browserHistory, withRouter } from 'react-router';

import NAVSCROLLITEMS from './data/navScrollToIndexData.jsx';
import NavScrollToIndex from './navScrollToIndex.jsx';
import SignOut from '../../containers/auth/signout';

export default WrappedComponent => {
	const NavBar = props => {
		return (
			<span>
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
				<WrappedComponent {...props} />
			</span>
		);
	};
	return withRouter(NavBar);
};
