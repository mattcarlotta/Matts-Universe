import map from 'lodash/map';
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import RenderInputField from '../forms/renderInputField';
import RenderFormButtons from '../forms/renderFormButtons';
import FIELDS from './fields/signupFormFields';

import { authError, signupUser } from '../../actions/authActionCreators';

const validate = values => {
	const errors = {};

	if (!values.email) errors.email = 'Required';
	else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email))
		errors.email = 'Invalid email address';

	if (!values.username) errors.username = 'Required';
	else if (values.username.length < 3)
		errors.username = 'Username must be more than 3 characters!';

	if (!values.password) errors.password = 'Required';
	else if (values.password.length < 5)
		errors.password = 'Password must be more than 5 characters!';

	return errors;
};

class Signup extends Component {
	handleFormSubmit = formProps => {
		this.props.signupUser(formProps);
	};

	render() {
		const { handleSubmit, pristine, reset, submitting } = this.props;

		return (
			<div className="auth-container col-xs-12">
				<form onSubmit={handleSubmit(this.handleFormSubmit)}>
					<h1>Sign Up</h1>
					{map(FIELDS, ({ name, type, component, label }, key) => {
						return (
							<Field
								key={key}
								name={name}
								type={type}
								component={RenderInputField}
								label={label}
							/>
						);
					})}
					<RenderFormButtons
						submitting={submitting}
						pristine={pristine}
						reset={reset}
					/>
				</form>
			</div>
		);
	}
}

export default reduxForm({
	form: 'signup',
	validate
})(connect(null, { authError, signupUser })(Signup));
