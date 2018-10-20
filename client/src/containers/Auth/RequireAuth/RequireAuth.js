import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { authError, signoutUser } from '../../../actions/authActionCreators';
import Spinner from '../../../components/Loaders/spinner';

const RequireAuth = ComposedComponent => {
  class Authentication extends Component {
    componentWillMount = () => {
      if (
        !this.props.isLoading &&
        (!this.props.username || !this.props.userIsGod)
      ) {
        this.redirectUser();
      }
    };

    componentWillUpdate = nextProps => {
      if (
        !this.props.isLoading &&
        (!nextProps.username || !nextProps.userIsGod)
      ) {
        this.redirectUser();
      }
    };

    redirectUser = () => {
      this.props.authError('You do not have permission to do that.');
      browserHistory.push('/');
    };

    render = () => {
      if (this.props.isLoading) return <Spinner />;

      return this.props.username && this.props.userIsGod ? (
        <ComposedComponent {...this.props} />
      ) : null;
    };
  }

  const mapStateToProps = state => ({
    isLoading: state.auth.fetchingUser,
    username: state.auth.username,
    userIsGod: state.auth.isGod,
  });

  Authentication.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    username: PropTypes.string.isRequired,
    userIsGod: PropTypes.bool.isRequired,
    authError: PropTypes.func.isRequired,
    signoutUser: PropTypes.func.isRequired,
  };

  return connect(
    mapStateToProps,
    { authError, signoutUser },
  )(Authentication);
};

export default RequireAuth;

RequireAuth.propTypes = {
  ComposedComponent: PropTypes.node,
};
