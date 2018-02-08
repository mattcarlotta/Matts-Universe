import React, { Fragment } from 'react';

import RenderNotifications from '../containers/app/renderNotifications';
import Footer from './navigation/footer';

const App = ({ children }) => (
	<Fragment>
		<div className="col-xs-12 no-padding">
			{children}
		</div>
		<Footer />
		<RenderNotifications />
	</Fragment>
);

export default App;
