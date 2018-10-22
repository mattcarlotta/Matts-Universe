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
      type={type}
    />
    <RenderFormErrors error={error} label={label} touched={touched} />
  </div>
);

export default TextArea;

TextArea.propTypes = {
  error: PropTypes.string,
  input: PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onDragStart: PropTypes.func,
    onDrop: PropTypes.func,
    onFocus: PropTypes.func,
  }),
  label: PropTypes.string,
  touched: PropTypes.bool,
  type: PropTypes.string,
};
