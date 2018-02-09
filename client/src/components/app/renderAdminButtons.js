import map from 'lodash/map';
import React from 'react';
import { Dropdown, Button, Icon, Menu } from 'antd';
const { Item: MenuItem } = Menu;

const RenderAdminButtons = ({
	bsStyle,
	id,
	iconClassName,
	title,
	items,
	onClickAction
}) => {
	return (
		<Dropdown
			overlay={
				<Menu onClick={({item}) => onClickAction(item)}>
					{items === undefined
						? <MenuItem disabled>No content was found!</MenuItem>
						: map(items, ({ _id, navTitle }) => (
								<MenuItem key={_id} id={_id} navTitle={navTitle}>
									<i className={`fa ${iconClassName}`} aria-hidden="true" />
									{navTitle}
							</MenuItem>
					))}
				</Menu>
			}
			trigger={['click']}
		>
			<Button>
				<i className={`fa ${iconClassName}`} aria-hidden="true" />
				<span>
					{title} <Icon type="down" />
				</span>
			</Button>
		</Dropdown>
	);
};

export default RenderAdminButtons;

/*

*/
