import React from 'react';
import {
  innerCircle,
  middleCircle,
  outerCircle,
  spinnerContainer,
  spinnerClockwise,
  spinnerCounterclockwise,
} from './spinner.scss';

export default ({ container }) => (
  <div className={container ? container : ''}>
    <div className={spinnerContainer}>
      <div className={`${spinnerCounterclockwise} ${outerCircle}`} />
      <div className={`${spinnerClockwise} ${middleCircle}`} />
      <div className={`${spinnerCounterclockwise} ${innerCircle}`} />
    </div>
  </div>
);
