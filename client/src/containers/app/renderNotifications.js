import React from 'react';
import { connect } from 'react-redux';

import RenderAlert from '../../components/app/RenderAlert';
import { resetNotifications } from '../../actions/authActionCreators';

const RenderNotifications = ({
	successMessage,
	errorMessage,
	resetNotifications
}) => {
	return (
		<span>
			{(errorMessage || successMessage) &&
				<RenderAlert
					successMessage={successMessage}
					errorMessage={errorMessage}
					resetNotifications={resetNotifications}
				/>}
		</span>
	);
};

export default connect(
	state => ({
		errorMessage: state.auth.error,
		successMessage: state.auth.success
	}),
	{ resetNotifications }
)(RenderNotifications);
