import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { signoutUser } from '../../actions/AuthActionCreators';

const SignOut = props => {
	return (
		<li>
			{props.username && props.userIsGod
				? <Link onClick={() => props.signoutUser()} className="link-centered">
						<i className="fa fa-sign-out" aria-hidden="true" /> SignOut
					</Link>
				: null}
		</li>
	);
};

const mapStateToProps = state => {
	return {
		username: state.auth.username,
		userIsGod: state.auth.isGod
	};
};

export default connect(mapStateToProps, { signoutUser })(SignOut);
