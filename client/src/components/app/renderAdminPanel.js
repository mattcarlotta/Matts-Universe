import map from 'lodash/map';
import React, { Fragment } from 'react';
import { Button } from 'antd';
import RenderAdminButtons from './renderAdminButtons';

export default ({
  BUTTONS,
  items,
  onAddClick,
  onDeleteClick,
  onEditClick,
  pageId,
  posts,
  projects,
  userIsGod,
  username
}) => (
  <Fragment>
    {username && userIsGod
      ? <div className="admin-tools">
          <h1>Admin Control Panel</h1>
          <Button onClick={onAddClick}>
            <i className="fa fa-plus" aria-hidden="true" />
            Add New {pageId ? 'Post' : 'Project'}
          </Button>
          {map(BUTTONS, (icon, key) => (
            <RenderAdminButtons
                key={key}
                iconClassName={`fa-${icon}`}
                items={pageId ? posts : projects}
                onClickAction={ icon === "trash-o" ? onDeleteClick : onEditClick}
                title={icon === "trash-o" ? "Delete" : "Edit"}
            />
          ))}
        </div>
      : null
    }
  </Fragment>
)
