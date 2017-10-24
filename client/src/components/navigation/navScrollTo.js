import React from 'react';
import { animateScroll as Nav } from 'react-scroll';
import { Link, browserHistory } from 'react-router';

export const NavScrollTo = ({ pixel, icon, title }) => {
	return (
		<li>
			<Link
				onClick={() => {
					browserHistory.push('/');
					Nav.scrollTo(pixel, { duration: 1150, smooth: 'easeInOutQuint' });
				}}
			>
				<i className={`fa ${icon}`} aria-hidden="true" />
				{window.innerWidth < 650 ? '' : title}
			</Link>
		</li>
	);
};

export default NavScrollTo;
