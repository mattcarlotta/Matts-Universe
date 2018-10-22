import React from 'react';
import PropTypes from 'prop-types';
import { clearValues, submit } from './renderFormButtons.scss';

const FormButtons = ({ submitting, pristine, reset }) => (
  <div>
    <button
      type="submit"
      className={`${submit} ant-btn ant-btn-primary`}
      disabled={submitting}
    >
      Submit
    </button>
    <button
      type="button"
      className={`${clearValues} ant-btn atn-btn-danger`}
      disabled={pristine || submitting}
      onClick={reset}
    >
      Clear
    </button>
  </div>
);

export default FormButtons;

FormButtons.propTypes = {
  submitting: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
};
