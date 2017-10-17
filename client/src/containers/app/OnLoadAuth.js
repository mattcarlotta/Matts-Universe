import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
	authenticateUser,
	fetchingUser
} from '../../actions/authActionCreators';
import Spinner from '../../components/loaders/spinner';

export default App => {
	class OnLoadAuth extends Component {
		componentDidMount() {
			this.props.authenticateUser();
		}

		render() {
			if (this.props.isLoading === undefined || this.props.isLoading)
				return <Spinner />;

			return <App {...this.props} />;
		}
	}

	return connect(state => ({ isLoading: state.auth.fetchingUser }), {
		authenticateUser,
		fetchingUser
	})(OnLoadAuth);
};
