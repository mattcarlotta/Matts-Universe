import React from 'react';
import PropTypes from 'prop-types';
import AdminPanel from '../../../containers/App/AdminPanel/AdminPanel';
import {
  blogContainer,
  errorMessage,
  noprojectContainer,
} from './noItemsFound.scss';

const NoItemsFound = ({ type }) => {
  const className =
    type.indexOf('blog') >= 0
      ? `${blogContainer} ${errorMessage}`
      : `${noprojectContainer} ${errorMessage}`;

  return (
    <div className={className}>
      <AdminPanel />
      <div data-abide-error>
        <p>
          <i
            className="fa fa-exclamation-triangle small-icon"
            aria-hidden="true"
          />
          {`No ${type} were found!`}
        </p>
      </div>
    </div>
  );
};

export default NoItemsFound;

NoItemsFound.propTypes = {
  type: PropTypes.string.isRequired,
};
