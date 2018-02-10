import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { message } from 'antd';

import { resetNotifications } from '../../actions/authActionCreators';

class RenderNotifications extends PureComponent {
	componentDidUpdate = () => {
		const { errorMessage, successMessage} = this.props;
		errorMessage && message.error(errorMessage, 1.5, this.props.resetNotifications())
		successMessage && message.success(successMessage, 1.5, this.props.resetNotifications());
	}

	render = () => ( <span /> )
}

export default connect(
	state => ({
		errorMessage: state.auth.error,
		successMessage: state.auth.success
	}),
	{ resetNotifications }
)(RenderNotifications);
