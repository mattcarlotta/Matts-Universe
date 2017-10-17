import React from 'react';

export const NextArrow = ({ style, onClick }) => {
	return (
		<div
			className={'nextpage-chevron fa fa-chevron-right'}
			style={style}
			onClick={onClick}
		/>
	);
};

export const PrevArrow = ({ style, onClick }) => {
	return (
		<div
			className={'prevpage-chevron fa fa-chevron-left'}
			style={style}
			onClick={onClick}
		/>
	);
};
