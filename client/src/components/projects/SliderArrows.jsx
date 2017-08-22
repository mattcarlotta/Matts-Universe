import React from 'react';

export const NextArrow = props => {
	const { style, onClick } = props;

	return (
		<div
			className={'nextpage-chevron fa fa-chevron-right'}
			style={style}
			onClick={onClick}
		/>
	);
};

export const PrevArrow = props => {
	const { style, onClick } = props;

	return (
		<div
			className={'prevpage-chevron fa fa-chevron-left'}
			style={style}
			onClick={onClick}
		/>
	);
};
