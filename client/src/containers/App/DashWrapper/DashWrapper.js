import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import {
  authenticateUser,
  fetchingUser,
} from '../../../actions/authActionCreators';
import Header from '../../../components/Navigation/Header/header';
import Spinner from '../../../components/Loaders/spinner';
import { wrapper } from './DashWrapper.scss';

const DashWrapper = WrappedComponent => {
  class DashboardWrapper extends PureComponent {
    componentDidMount = () => this.props.authenticateUser();

    render = () =>
      this.props.isLoading ? (
        <Spinner />
      ) : (
        <div className={wrapper}>
          <Header />
          <WrappedComponent {...this.props} />
        </div>
      );
  }

  DashboardWrapper.propTypes = {
    authenticateUser: PropTypes.func.isRequired,
    fetchingUser: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
  };

  return connect(
    state => ({ isLoading: state.auth.fetchingUser }),
    {
      authenticateUser,
      fetchingUser,
    },
  )(withRouter(DashboardWrapper));
};

export default DashWrapper;

DashWrapper.propTypes = {
  WrappedComponent: PropTypes.node,
};
