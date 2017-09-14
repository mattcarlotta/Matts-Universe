import React from 'react';

const Spinner = ({ container }) => {
	const componentContainer = container ? container : '';

	return (
		<div className={componentContainer}>
			<div className="spinner-container bottom-padded">
				{/* <div className="text-center">Loading...</div> */}
				<div className="spinner-counterclockwise outer-circle" />
				<div className="spinner-clockwise middle-circle" />
				<div className="spinner-counterclockwise inner-circle" />
			</div>
		</div>
	);
};

export default Spinner;
