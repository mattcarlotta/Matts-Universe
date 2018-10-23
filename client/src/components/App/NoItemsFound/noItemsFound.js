import React from 'react';
import PropTypes from 'prop-types';
import AdminPanel from '../../../containers/App/AdminPanel/AdminPanel';
import { noprojectContainer } from './noItemsFound.scss';

const NoItemsFound = ({ style }) => (
  <div style={style} className={noprojectContainer}>
    <AdminPanel />
    <div data-abide-error>
      <p>
        <i
          className="fa fa-exclamation-triangle small-icon"
          aria-hidden="true"
        />
        {`No projects were found!`}
      </p>
    </div>
  </div>
);

export default NoItemsFound;

NoItemsFound.propTypes = {
  style: PropTypes.objectOf(PropTypes.string),
};
