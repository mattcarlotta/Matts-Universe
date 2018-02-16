import React from 'react';

export default ({ submitting, pristine, resetForm }) => [
	<button
		key="submitButton"
		type="submit"
		className="submit btn btn-primary"
		disabled={submitting}
	>
		Submit
	</button>,
	<button
		key="resetButton"
		type="button"
		className="clear-values btn btn-danger"
		disabled={pristine || submitting}
		onClick={resetForm}
	>
		Clear
	</button>
];
