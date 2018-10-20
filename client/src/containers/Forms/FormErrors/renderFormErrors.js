import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { errorHandlers, formLabel } from './renderFormErrors.scss';

const FormErrors = ({ error, label, touched }) => (
  <Fragment>
    {touched && error && <div className={errorHandlers}>{error}</div>}
    <label className={formLabel}>{label}</label>
  </Fragment>
);

export default FormErrors;

FormErrors.propTypes = {
  error: PropTypes.string,
  label: PropTypes.string,
  touched: PropTypes.bool,
};
