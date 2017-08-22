import React from 'react';

const Spinner = props => {
	const container = props ? props.contanier : '';

	return (
		<div className={container}>
			<div className="spinner-container bottom-padded">
				<div className="spinner-counterclockwise outer-circle" />
				<div className="spinner-clockwise middle-circle" />
				<div className="spinner-counterclockwise inner-circle" />
			</div>
		</div>
	);
};

export default Spinner;
