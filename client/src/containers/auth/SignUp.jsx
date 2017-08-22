import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import { authError, signupUser } from '../../actions/AuthActionCreators';
import RenderAlert from '../../components/app/RenderAlert';

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

const renderField = ({ input, label, type, meta: { touched, error } }) =>
	<div>
		<label>
			{label}
		</label>
		<div>
			<input {...input} type={type} />
			{touched &&
				error &&
				<div className="error-handlers">
					<i className="fa fa-exclamation-triangle" aria-hidden="true" />{' '}
					{error}
				</div>}
		</div>
	</div>;

class Signup extends Component {
	componentWillUnmount() {
		this.props.authError('');
	}

	handleFormSubmit = formProps => {
		this.props.signupUser(formProps);
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
				<h1>Sign Up</h1>
				<hr />
				<form onSubmit={handleSubmit(this.handleFormSubmit)}>
					<Field
						name="email"
						type="text"
						component={renderField}
						label="Email"
					/>
					<Field
						name="username"
						type="text"
						component={renderField}
						label="Username"
					/>
					<Field
						name="password"
						type="password"
						component={renderField}
						label="Password"
					/>
					<div>
						<button
							type="submit"
							className="btn btn-primary partial-expand rounded"
							disabled={submitting}>
							Submit
						</button>
						<button
							type="button"
							className="btn btn-danger partial-expand rounded f-r"
							disabled={pristine || submitting}
							onClick={reset}>
							Clear Values
						</button>
					</div>
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

Signup = reduxForm({
	form: 'signup',
	validate,
	fields: ['email', 'username', 'password']
})(Signup);

export default (Signup = connect(
	state => {
		return { serverError: state.auth.error };
	},
	{ authError, signupUser }
)(Signup));
