import React from 'react';
import { Link } from 'react-router';
import notFound from '../../images/notFound.png';

const NotFound = () => {
	return (
		<div className="notfound-container">
			<Link to="/">
				<img src={notFound} alt="notFound.png" />
			</Link>
		</div>
	);
};

export default NotFound;
