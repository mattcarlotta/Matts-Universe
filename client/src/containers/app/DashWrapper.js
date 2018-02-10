import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
// import { Scrollbars } from 'react-custom-scrollbars';
import SpringScrollbars from '../../components/app/SpringScrollbars';

import { authenticateUser, fetchingUser } from '../../actions/authActionCreators';
import Header from '../../components/navigation/header';
import Spinner from '../../components/loaders/spinner';

export default WrappedComponent => {
	class DashboardWrapper extends PureComponent {
		componentDidMount = () =>	this.props.authenticateUser();

		componentDidUpdate = prevProps => this.props.location.pathname !== prevProps.location.pathname && this.setScrollHeight(-1060);

		setScrollHeight = val => this.refs.scrollbars.scrollTop(val);

		render() {
			if (this.props.isLoading === undefined || this.props.isLoading) return <Spinner />
			return (
				<Fragment>
					<Header setScrollHeight={this.setScrollHeight} />
					<SpringScrollbars ref="scrollbars">
						<WrappedComponent {...this.props} />
					</SpringScrollbars>
				</Fragment>
			);
		}
	}

	return connect(state => ({ isLoading: state.auth.fetchingUser }), {
		authenticateUser,
		fetchingUser
	})(withRouter(DashboardWrapper));
};
