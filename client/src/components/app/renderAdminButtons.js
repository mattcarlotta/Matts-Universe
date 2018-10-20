import map from 'lodash/map';
import React from 'react';
import { Dropdown, Button, Icon, Menu } from 'antd';
const { Item: MenuItem } = Menu;

export default ({
	bsStyle,
	id,
	iconClassName,
	title,
	items,
	onClickAction
}) => (
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
			{title} <Icon type="down" />
		</Button>
	</Dropdown>
);
