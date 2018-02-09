import React from 'react';
import { message } from 'antd';

export default ({errorMessage, successMessage}) => {
	const renderSuccess = () => {
		successMessage && message.success(successMessage)
	}

	const renderError = () => {
		errorMessage && message.error(errorMessage)
	}

	return (
		<span>
			{renderError()}
			{renderSuccess()}
		</span>
	)
}
