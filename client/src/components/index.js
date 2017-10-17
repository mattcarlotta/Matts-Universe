import React from 'react';

import RenderNotifications from '../containers/app/renderNotifications';
import Footer from './navigation/footer';

const App = ({ children }) => {
	return (
		<div className="wrapper">
			<div className="col-xs-12 no-padding">
				{children}
			</div>
			<Footer />
			<RenderNotifications />
		</div>
	);
};

export default App;
