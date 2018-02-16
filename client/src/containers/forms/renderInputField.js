import React, { Fragment } from 'react';
import RenderFormErrors from './renderFormErrors';

export default ({ input, label, type, meta: { touched, error } }) => (
	<Fragment>
		<input
			className={touched && error ? 'form-input input-error' : 'form-input'}
			{...input}
			type={type}
			placeholder={label}
		/>
		<RenderFormErrors
			error={error}
			label={label}
			touched={touched}
		/>
	</Fragment>
);
