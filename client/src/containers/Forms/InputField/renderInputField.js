import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import RenderFormErrors from '../FormErrors/renderFormErrors';
import { formInput, inputError } from './renderInputField.scss';

const InputField = ({ input, label, type, meta: { touched, error } }) => (
  <Fragment>
    <input
      className={
        touched && error ? `${formInput} ${inputError}` : `${formInput}`
      }
      {...input}
      type={type}
      placeholder={label}
    />
    <RenderFormErrors error={error} label={label} touched={touched} />
  </Fragment>
);

export default InputField;

InputField.propTypes = {
  error: PropTypes.string,
  input: PropTypes.objectOf(PropTypes.func),
  label: PropTypes.string,
  touched: PropTypes.bool,
  type: PropTypes.string,
};
