import React from 'react';
import PropTypes from 'prop-types';
import AdminPanel from '../../../containers/App/AdminPanel/AdminPanel';
import {
  blogContainer,
  errorMessage,
  noprojectContainer,
} from './noItemsFound.scss';

const NoItemsFound = ({ message }) => {
  const className =
    message.indexOf('blog') >= 0
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
          {message}
        </p>
      </div>
    </div>
  );
};

export default NoItemsFound;

NoItemsFound.propTypes = {
  message: PropTypes.string,
};
