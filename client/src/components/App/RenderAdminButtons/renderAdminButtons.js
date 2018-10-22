import map from 'lodash/map';
import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown, Button, Icon, Menu } from 'antd';

const { Item: MenuItem } = Menu;

const AdminButtons = ({ iconClassName, title, items, onClickAction }) => (
  <Dropdown
    overlay={
      <Menu onClick={({ item }) => onClickAction(item)}>
        {items === undefined ? (
          <MenuItem disabled>No content was found!</MenuItem>
        ) : (
          map(items, ({ _id, navTitle }) => (
            <MenuItem key={_id} id={_id} navTitle={navTitle}>
              <i className={`fa ${iconClassName}`} aria-hidden="true" />
              {navTitle}
            </MenuItem>
          ))
        )}
      </Menu>
    }
    trigger={['click']}
  >
    <Button type="normal">
      <i className={`fa ${iconClassName}`} aria-hidden="true" />
      {title} <Icon type="down" />
    </Button>
  </Dropdown>
);

export default AdminButtons;

AdminButtons.propTypes = {
  iconClassName: PropTypes.string,
  title: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.object),
  onClickAction: PropTypes.func,
};
