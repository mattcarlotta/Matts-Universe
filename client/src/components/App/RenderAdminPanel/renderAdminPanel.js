import map from 'lodash/map';
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import RenderAdminButtons from '../RenderAdminButtons/renderAdminButtons';
import { adminTools } from './renderAdminPanel.scss';

const AdminPanel = ({
  BUTTONS,
  handleOnAddClick,
  handleOnDeleteClick,
  handleOnEditClick,
  pageId,
  posts,
  projects,
  userIsGod,
  username,
}) => (
  <Fragment>
    {username && userIsGod ? (
      <div className={adminTools}>
        <Button type="normal" onClick={handleOnAddClick}>
          <i className="fa fa-plus" aria-hidden="true" />
          Add New {pageId ? 'Post' : 'Project'}
        </Button>
        {map(BUTTONS, (icon, key) => (
          <RenderAdminButtons
            key={key}
            iconClassName={`fa-${icon}`}
            items={pageId ? posts : projects}
            onClickAction={
              icon === 'trash-o' ? handleOnDeleteClick : handleOnEditClick
            }
            title={icon === 'trash-o' ? 'Delete' : 'Edit'}
          />
        ))}
      </div>
    ) : null}
  </Fragment>
);

export default AdminPanel;

AdminPanel.propTypes = {
  BUTTONS: PropTypes.arrayOf(PropTypes.string),
  handleOnAddClick: PropTypes.func,
  handleOnDeleteClick: PropTypes.func,
  handleOnEditClick: PropTypes.func,
  pageId: PropTypes.string,
  posts: PropTypes.arrayOf(PropTypes.object),
  projects: PropTypes.arrayOf(PropTypes.object),
  userIsGod: PropTypes.bool,
  username: PropTypes.string,
};
