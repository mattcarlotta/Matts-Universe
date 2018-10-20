import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import {
  authenticateUser,
  fetchingUser,
} from '../../../actions/authActionCreators';
import Header from '../../../components/Navigation/Header/header';
import Spinner from '../../../components/Loaders/spinner';

const DashWrapper = WrappedComponent => {
  class DashboardWrapper extends PureComponent {
    componentDidMount = () => this.props.authenticateUser();

    render = () =>
      this.props.isLoading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Header />
          <WrappedComponent {...this.props} />
        </Fragment>
      );
  }

  return connect(
    state => ({ isLoading: state.auth.fetchingUser }),
    {
      authenticateUser,
      fetchingUser,
    },
  )(withRouter(DashboardWrapper));

  DashboardWrapper.propTypes = {
    authenticateUser: PropTypes.func.isRequired,
    fetchingUser: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
  };
};

RequireAuth.propTypes = {
  WrappedComponent: PropTypes.node,
};
