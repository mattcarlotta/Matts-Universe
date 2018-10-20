import map from 'lodash/map';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import RenderInputField from '../../Forms/InputField/renderInputField';
import RenderFormButtons from '../../Forms/FormButtons/renderFormButtons';
import { authError, signinUser } from '../../../actions/authActionCreators';
import { isRequired } from '../../Forms/Validate/validateFormFields';
import { authContainer } from '../../../styles/index.scss';

const FIELDS = [
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

class Signin extends Component {
  handleFormSubmit = formProps => this.props.signinUser(formProps);

  render = () => {
    const { handleSubmit, pristine, reset, submitting } = this.props;

    return (
      <div className={`${authContainer} col-xs-12`}>
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
  };
}

export default reduxForm({
  form: 'signin',
})(
  connect(
    null,
    { authError, signinUser },
  )(Signin),
);

Signin.propTypes = {
  authError: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  signinUser: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
};
