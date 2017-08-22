import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import { authError, signinUser } from '../../actions/AuthActionCreators';
import RenderAlert from '../../components/app/RenderAlert';

const validate = values => {
	const errors = {};

	if (!values.username) errors.username = 'Required';
	if (!values.password) errors.password = 'Required';

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
				<h1>Sign In</h1>
				<hr />
				<form onSubmit={handleSubmit(this.handleFormSubmit)}>
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
