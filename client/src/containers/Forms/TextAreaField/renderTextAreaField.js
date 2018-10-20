import React from 'react';
import PropTypes from 'prop-types';
import RenderFormErrors from '../FormErrors/renderFormErrors';
import { formDetails, inputError } from './renderTextAreaField.scss';

const TextArea = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <textarea
      {...input}
      className={
        touched && error ? `${formDetails} ${inputError}` : `${formDetails}`
      }
      placeholder={label}
      type={type}
    />
    <RenderFormErrors error={error} label={label} touched={touched} />
  </div>
);

export default TextArea;

TextArea.propTypes = {
  error: PropTypes.string,
  input: PropTypes.objectOf(PropTypes.func),
  label: PropTypes.string,
  touched: PropTypes.bool,
  type: PropTypes.string,
};