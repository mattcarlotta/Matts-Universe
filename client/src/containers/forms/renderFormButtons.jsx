import React from 'react';

const RenderFormButtons = ({ submitting, pristine, resetForm }) => {
	return (
		<div>
			<button
				type="submit"
				className="submit btn btn-primary partial-expand rounded"
				disabled={submitting}
			>
				Submit
			</button>
			<button
				type="button"
				className="clear-values btn btn-danger partial-expand rounded f-r"
				disabled={pristine || submitting}
				onClick={resetForm}
			>
				Clear
			</button>
		</div>
	);
};

export default RenderFormButtons;
