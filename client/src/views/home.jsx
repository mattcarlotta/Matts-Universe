import React from 'react';

import Header from '../components/navigation/header';

const Home = () => {
	return (
		<div className="index-container">
			<Header />
			<div className="placard text-center">
				<h1>Welcome to my universe.</h1>
				<hr />
				<p>full stack web developer and commercial artist</p>
			</div>
		</div>
	);
};

export default Home;
