import React from 'react';

export default ({ submitting, pristine, resetForm }) => (
	<div>
		<button
			type="submit"
			className="submit btn btn-primary"
			disabled={submitting}
		>
			Submit
		</button>
		<button
			type="button"
			className="clear-values btn btn-danger"
			disabled={pristine || submitting}
			onClick={resetForm}
		>
			Clear
		</button>
	</div>
);
