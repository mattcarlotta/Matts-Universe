import map from 'lodash/map';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import RenderInputField from '../../Forms/InputField/renderInputField';
import RenderFormButtons from '../../Forms/FormButtons/renderFormButtons';
import { signupUser } from '../../../actions/authActionCreators';
import { authContainer } from '../../../styles/index.scss';

const FIELDS = [
  {
    name: 'email',
    type: 'text',
    label: 'Email',
  },
  {
    name: 'username',
    type: 'text',
    label: 'Username',
  },
  {
    name: 'password',
    type: 'password',
    label: 'Password',
  },
];

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
  handleFormSubmit = formProps => this.props.signupUser(formProps);

  render = () => {
    const { handleSubmit, pristine, reset, submitting } = this.props;

    return (
      <div className={`${authContainer} col-xs-12`}>
        <form onSubmit={handleSubmit(this.handleFormSubmit)}>
          <h1>Sign Up</h1>
          {map(FIELDS, ({ name, type, label }, key) => (
            <Field
              key={key}
              name={name}
              type={type}
              component={RenderInputField}
              label={label}
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
  };
}

export default reduxForm({
  form: 'signup',
  validate,
})(
  connect(
    null,
    { signupUser },
  )(Signup),
);

Signup.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  signupUser: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
};
