import map from 'lodash/map';
import React from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';

const RenderAdminButtons = ({
	bsStyle,
	id,
	iconClassName,
	title,
	items,
	button,
	onClickAction
}) => {
	return (
		<DropdownButton
			bsStyle={bsStyle}
			id={id}
			title={
				<span>
					<i className={`fa ${iconClassName}`} aria-hidden="true" />
					<span>
						{title}
					</span>
				</span>
			}
		>
			{items === undefined
				? <MenuItem disabled>No content was found!</MenuItem>
				: map(items, ({ _id, navTitle }) => {
						return button === 'delete'
							? <MenuItem key={_id} onClick={() => onClickAction(_id)}>
									<i className={`fa ${iconClassName}`} aria-hidden="true" />
									{navTitle}
								</MenuItem>
							: <MenuItem key={_id} onClick={() => onClickAction(navTitle)}>
									<i className={`fa ${iconClassName}`} aria-hidden="true" />
									{navTitle}
								</MenuItem>;
					})}
		</DropdownButton>
	);
};

export default RenderAdminButtons;
