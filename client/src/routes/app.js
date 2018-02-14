// REACT AND REACT-ROUTER IMPORTS
import React from 'react';
import { Router } from 'react-router';
import { browserHistory } from 'react-router';
// REDUX IMPORTS
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import thunk from 'redux-thunk';
// ANTD LANGUAGE PROVIDER
import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
// APPLICATION ROUTES AND REDUCERS
import rootReducer from '../reducers';
import routes from './routes';

// CONFIGURE REDUX STORE AND BROWSERHISTORY
const store = createStore(rootReducer,applyMiddleware(thunk));
const history = syncHistoryWithStore(browserHistory, store);

// APP CONFIGURED WITH REDUX STORE, BROWSERHISTORY AND ROUTES
export default () => (
	<LocaleProvider locale={enUS}>
		<Provider store={store}>
			<Router history={history} routes={routes} />
		</Provider>
	</LocaleProvider>
);
