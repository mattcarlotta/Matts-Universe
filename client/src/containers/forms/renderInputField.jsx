import React from 'react';

const RenderInputField = ({ input, label, type, meta: { touched, error } }) => {
	return (
		<div>
			<div>
				<input
					className={touched && error ? 'form-input input-error' : 'form-input'}
					{...input}
					type={type}
					placeholder={label}
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

export default RenderInputField;
