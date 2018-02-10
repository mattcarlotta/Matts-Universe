import map from 'lodash/map';
import React from 'react';
import { Link, browserHistory } from 'react-router';

import NAVLINKS from './links/headerLinks';
import ResizeWindowOnChange from '../app/ResizeWindowOnChange'
import SignOut from '../../containers/auth/signout';

const Header = ({scrollY, setScrollHeight}) => (
	<nav className={`navigation-container ${scrollY >= 30 ? 'fixed-nav' : ''}`}>
		<ul className="navigation-bar">
			{map (NAVLINKS, ({ icon, pixel, pathname, query, title}) => (
				<li key={icon}>
					<Link
						onClick={() => {
							browserHistory.push({pathname, query});
							pixel && window.setTimeout(() => setScrollHeight(pixel), 100);
							}
						}
					>
						<i className="material-icons">{icon}</i>
						{window.innerWidth < 650 ? '' : title}
					</Link>
				</li>
			))}
			<li>
				<a href="http:///www.mattcarlotta.blogspot.com" rel="noopener noreferrer" target="_blank">
					<i className="material-icons">work</i>
					{window.innerWidth < 650 ? '' : 'Portfolio'}
				</a>
			</li>
			<SignOut window={window.innerWidth} />
		</ul>
	</nav>
)


export default ResizeWindowOnChange(Header);
