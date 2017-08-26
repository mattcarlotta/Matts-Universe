import map from 'lodash/map';
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import RenderInputField from '../forms/renderInputField';
import RenderFormButtons from '../forms/renderFormButtons';

import { authError, signinUser } from '../../actions/authActionCreators';
import RenderAlert from '../../components/app/RenderAlert';

const validate = values => {
	const errors = {};

	if (!values.username) errors.username = 'Required';
	if (!values.password) errors.password = 'Required';

	return errors;
};

const FIELDS = [
	{
		name: 'username',
		type: 'text',
		label: 'Username'
	},
	{
		name: 'password',
		type: 'password',
		label: 'Password'
	}
];

class Signin extends Component {
	componentWillUnmount() {
		this.props.authError('');
	}

	handleFormSubmit = formProps => {
		this.props.signinUser(formProps);
	};

	render() {
		const {
			handleSubmit,
			pristine,
			reset,
			submitting,
			serverError
		} = this.props;

		return (
			<div className="auth-container col-xs-12">
				<form onSubmit={handleSubmit(this.handleFormSubmit)}>
					<h1>Sign In</h1>
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
				{serverError
					? <RenderAlert
							resetError={this.props.authError}
							errorMessage={serverError}
						/>
					: null}
			</div>
		);
	}
}

Signin = reduxForm({
	form: 'signin',
	validate,
	fields: ['username', 'password']
})(Signin);

export default (Signin = connect(
	state => {
		return { serverError: state.auth.error };
	},
	{ authError, signinUser }
)(Signin));
