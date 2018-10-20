import React from 'react';
import PropTypes from 'prop-types';
import {
  innerCircle,
  middleCircle,
  outerCircle,
  spinnerContainer,
  spinnerClockwise,
  spinnerCounterclockwise,
} from './spinner.scss';

const Spinner = ({ container }) => (
  <div className={container || ''}>
    <div className={spinnerContainer}>
      <div className={`${spinnerCounterclockwise} ${outerCircle}`} />
      <div className={`${spinnerClockwise} ${middleCircle}`} />
      <div className={`${spinnerCounterclockwise} ${innerCircle}`} />
    </div>
  </div>
);

export default Spinner;

Spinner.propTypes = {
  container: PropTypes.objectOf(PropTypes.string),
};
