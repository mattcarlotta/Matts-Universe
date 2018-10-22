import React from 'react';
import PropTypes from 'prop-types';
import { showCharLeft } from './showCharactersLeft.scss';

function CharactersLeft(propValue, limitValue) {
  if (propValue) {
    const postCharactersLeft =
      propValue.length <= limitValue
        ? limitValue - propValue.length
        : 'Too many characters!';

    return (
      <p className={showCharLeft}>Characters left: {postCharactersLeft}</p>
    );
  }
}

export default CharactersLeft;

CharactersLeft.propTypes = {
  propValue: PropTypes.string,
  limitValue: PropTypes.number,
};
