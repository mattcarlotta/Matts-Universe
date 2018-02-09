// REACT AND REACT-ROUTER IMPORTS
import React from 'react';
import { Router } from 'react-router';
import { browserHistory } from 'react-router';
// REDUX IMPORTS
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from '../store/configureStore';
// ANTD LANGUAGE PROVIDER
import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
// APPLICATION ROUTES
import routes from './routes';

// CONFIGURE REDUX STORE AND BROWSERHISTORY
const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

// APP CONFIGURED WITH REDUX STORE, BROWSERHISTORY AND ROUTES
export default () => (
	<LocaleProvider locale={enUS}>
		<Provider store={store}>
			<Router history={history} routes={routes} />
		</Provider>
	</LocaleProvider>
);
