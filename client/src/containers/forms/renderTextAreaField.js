import React from 'react';
import RenderFormErrors from './renderFormErrors';

export default ({
	input,
	label,
	type,
	meta: { touched, error }
}) => (
	<div>
		<textarea
			{...input}
			className={touched && error ? 'form-details input-error' : 'form-details'}
			placeholder={label}
			type={type}
		/>
		<RenderFormErrors
			error={error}
			label={label}
			touched={touched}
		/>
	</div>
);
