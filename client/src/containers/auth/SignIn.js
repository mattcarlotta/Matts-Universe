import map from 'lodash/map';
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import RenderInputField from '../forms/renderInputField';
import RenderFormButtons from '../forms/renderFormButtons';
import FIELDS from './fields/signinFormFields';

import { authError, signinUser } from '../../actions/authActionCreators';
import { isRequired } from '../forms/validateFormFields';

class Signin extends Component {
	handleFormSubmit = formProps => this.props.signinUser(formProps);

	render = () => {
		const { handleSubmit, pristine, reset, submitting } = this.props;

		return (
			<div className="auth-container col-xs-12">
				<form onSubmit={handleSubmit(this.handleFormSubmit)}>
					<h1>Sign In</h1>
					{map(FIELDS, ({ name, type, component, label }, key) => (
						<Field
							key={key}
							name={name}
							type={type}
							component={RenderInputField}
							label={label}
							validate={[isRequired]}
						/>
					))}
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
	form: 'signin'
})(connect(null, { authError, signinUser })(Signin));
