import React, { Component } from 'react';
import { connect } from 'react-redux';

import RenderAlert from '../../components/app/RenderAlert';
import { resetNotifications } from '../../actions/authActionCreators';

class RenderNotifications extends Component {
	componentDidUpdate = () => this.props.resetNotifications();

	render = () => {
		const { successMessage, errorMessage, resetNotifications } = this.props;
		return (
			<span>
				{(errorMessage || successMessage) &&
					<RenderAlert
						successMessage={successMessage}
						errorMessage={errorMessage}
						resetNotifications={resetNotifications}
					/>}
			</span>
		)
	}
}


export default connect(
	state => ({
		errorMessage: state.auth.error,
		successMessage: state.auth.success
	}),
	{ resetNotifications }
)(RenderNotifications);
