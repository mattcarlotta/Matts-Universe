import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { signoutUser } from '../../actions/authActionCreators';

const SignOut = ({ username, signoutUser }) => {
	return (
		<li>
			{username
				? <Link onClick={() => signoutUser()} className="link-centered">
						<i className="fa fa-sign-out" aria-hidden="true" /> SignOut
					</Link>
				: null}
		</li>
	);
};

const mapStateToProps = state => {
	return {
		username: state.auth.username
	};
};

export default connect(mapStateToProps, { signoutUser })(SignOut);
