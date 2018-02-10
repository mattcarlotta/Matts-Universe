import throttle from 'lodash/throttle';
import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Scrollbars } from 'react-custom-scrollbars';

import { authenticateUser, fetchingUser } from '../../actions/authActionCreators';
import Header from '../../components/navigation/header';
import Spinner from '../../components/loaders/spinner';

export default WrappedComponent => {
	class DashboardWrapper extends PureComponent {
		state = { scrollY: 0 };

		componentDidMount = () =>	this.props.authenticateUser();

		componentDidUpdate = prevProps => this.props.location.pathname !== prevProps.location.pathname && this.refs.scrollbars.scrollToTop();

		handleScroll = throttle(() => this.setState({ scrollY: this.refs.scrollbars.getScrollTop()}), 100)

		setScrollHeight = val => this.refs.scrollbars.scrollTop(val);

		render() {
			if (this.props.isLoading === undefined || this.props.isLoading) return <Spinner />
			return (
				<Fragment>
					<Header scrollY={this.state.scrollY} setScrollHeight={this.setScrollHeight} />
					<Scrollbars
						ref="scrollbars"
						style={{ width: '100%', top: '50px' }}
						autoHeight
						autoHeightMin={`calc(100vh - 50px)`}
						autoHide
						autoHideTimeout={500}
						autoHideDuration={200}
						onScrollFrame={this.handleScroll}
						renderThumbVertical={props => <div {...props} className="scrollbar"/>}
					>
						<WrappedComponent {...this.props} />
					</Scrollbars>
				</Fragment>
			);
		}
	}

	return connect(state => ({ isLoading: state.auth.fetchingUser }), {
		authenticateUser,
		fetchingUser
	})(withRouter(DashboardWrapper));
};
