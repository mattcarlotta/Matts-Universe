import React from 'react';

import Footer from './navigation/footer';

const App = ({ children }) => {
	return (
		<div className="wrapper">
			<div className="col-xs-12 no-padding">
				{children}
			</div>
			<Footer />
		</div>
	);
};

export default App;
