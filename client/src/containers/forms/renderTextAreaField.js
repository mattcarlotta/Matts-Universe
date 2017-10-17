import React from 'react';

const RenderTextAreaField = ({
	input,
	label,
	type,
	meta: { touched, error }
}) => {
	return (
		<div>
			<div>
				<textarea
					{...input}
					className={
						touched && error ? 'form-details input-error' : 'form-details'
					}
					placeholder={label}
					type={type}
				/>
				{touched &&
					error &&
					<div className="error-handlers">
						{error}
					</div>}
				<label className="form-label">
					{label}
				</label>
			</div>
		</div>
	);
};

export default RenderTextAreaField;
