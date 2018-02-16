import React from 'react';

export default ({ container }) => (
	<div className={ container ? container : ''}>
		<div className="spinner-container">
			<div className="spinner-counterclockwise outer-circle" />
			<div className="spinner-clockwise middle-circle" />
			<div className="spinner-counterclockwise inner-circle" />
		</div>
	</div>
);
