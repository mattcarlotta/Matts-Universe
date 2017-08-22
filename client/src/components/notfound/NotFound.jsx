import React from 'react';
import { Link } from 'react-router';

const NotFound = () => {
	return (
		<div className="notfound-container">
			<Link to="/">
				<img src={require('../../images/notFound6.png')} alt="" />
			</Link>
		</div>
	);
};

export default NotFound;
