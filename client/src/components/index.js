import React, { Fragment } from 'react';

import RenderNotifications from '../containers/app/renderNotifications';
import Footer from './navigation/footer';

const App = ({ children }) => (
	<Fragment>
		<RenderNotifications />
		<div className="col-xs-12 no-padding">
			{children}
		</div>
		<Footer />
	</Fragment>
);

export default App;
