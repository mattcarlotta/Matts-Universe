import React from 'react';

import Footer from './navigation/Footer';

const App = props => {
	return (
		<div className="wrapper">
			<div className="col-xs-12 no-padding">
				{props.children}
			</div>
			<Footer />
		</div>
	);
};

export default App;
