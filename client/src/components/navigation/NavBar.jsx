import React from 'react';
import { Link, browserHistory, withRouter } from 'react-router';
import { animateScroll as Nav } from 'react-scroll';

import SignOut from '../../containers/auth/SignOut';

export default function(WrappedComponent) {
	const NavBar = props => {
		const goToIndex = pixel => {
			browserHistory.push('/');
			Nav.scrollTo(pixel, { duration: 1150, smooth: 'easeInOutQuint' });
		};

		return (
			<span>
				<nav className="navigation-container">
					<ul className="navigation-bar">
						<li>
							<Link onClick={goToIndex.bind(this, 0)}>
								<i className="fa fa-home" aria-hidden="true" />
								Home
							</Link>
						</li>
						<li>
							<Link onClick={goToIndex.bind(this, 1000)}>
								<i className="fa fa-question-circle-o" aria-hidden="true" />
								About
							</Link>
						</li>
						<li>
							<Link onClick={goToIndex.bind(this, 2000)}>
								<i className="fa fa-cogs" aria-hidden="true" />
								Projects
							</Link>
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
							<Link onClick={goToIndex.bind(this, 2120)}>
								<i className="fa fa-envelope" aria-hidden="true" />
								Contact
							</Link>
						</li>
						<SignOut />
					</ul>
				</nav>
				<WrappedComponent {...props} />
			</span>
		);
	};
	return withRouter(NavBar);
}
