import React, { Fragment } from 'react';

export default ({ error, label, touched }) => (
  <Fragment>
    {touched && error &&
      <div className="error-handlers">
        {error}
      </div>
    }
    <label className="form-label">
      {label}
    </label>
  </Fragment>
)
