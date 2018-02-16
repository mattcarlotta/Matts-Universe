import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { signoutUser } from '../../actions/authActionCreators';

const SignOut = ({ username, signoutUser, window }) => (
	<li>
		{username
			? <Link onClick={() => signoutUser()}>
					<i className="material-icons">exit_to_app</i>
					{window < 650 ? '' : 'SignOut'}
				</Link>
		 : null
	 }
	</li>
)

export default connect(state => ({ username: state.auth.username}), { signoutUser })(SignOut);
