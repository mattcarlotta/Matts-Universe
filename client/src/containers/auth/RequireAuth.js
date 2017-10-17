import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { authError, signoutUser } from '../../actions/authActionCreators';
import Spinner from '../../components/loaders/spinner';

export default function(ComposedComponent) {
	class Authentication extends Component {
		componentWillMount() {
			if (!this.props.isLoading) {
				if (!this.props.username || !this.props.userIsGod) {
					this.redirectUser();
				}
			}
		}

		componentWillUpdate(nextProps, nextState) {
			if (!this.props.isLoading) {
				if (!nextProps.username || !nextProps.userIsGod) {
					this.redirectUser();
				}
			}
		}

		redirectUser = () => {
			this.props.authError('You do not have permission to do that.');
			browserHistory.push('/');
		};

		render() {
			if (this.props.isLoading) return <Spinner />;

			return (
				<span>
					{this.props.username && this.props.userIsGod
						? <ComposedComponent {...this.props} />
						: null}
				</span>
			);
		}
	}

	const mapStateToProps = state => {
		return {
			isLoading: state.auth.fetchingUser,
			username: state.auth.username,
			userIsGod: state.auth.isGod
		};
	};

	return connect(mapStateToProps, { authError, signoutUser })(Authentication);
}
