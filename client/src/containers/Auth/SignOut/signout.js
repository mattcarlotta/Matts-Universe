import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { signoutUser } from '../../../actions/authActionCreators';

const SignOut = ({ username, signoutUser }) => (
  <li>
    {username ? (
      <Link onClick={() => signoutUser()}>
        <i className="material-icons">exit_to_app</i>
        <span className="header-title">SignOut</span>
      </Link>
    ) : null}
  </li>
);

export default connect(
  state => ({ username: state.auth.username }),
  { signoutUser },
)(SignOut);

SignOut.propTypes = {
  username: PropTypes.string,
  signoutUser: PropTypes.func.isRequired,
};
