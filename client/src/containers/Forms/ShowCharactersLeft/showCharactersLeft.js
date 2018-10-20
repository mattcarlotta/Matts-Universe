import React from 'react';
import PropTypes from 'prop-types';

const CharactersLeft = (propValue, limitValue) => {
  if (propValue) {
    let postCharactersLeft =
      propValue.length <= limitValue
        ? limitValue - propValue.length
        : 'Too many characters!';

    return (
      <p style={{ fontSize: 10 }}>Characters left: {postCharactersLeft}</p>
    );
  }
};

export default CharactersLeft;

CharactersLeft.propTypes = {
  propValue: PropTypes.string,
  limitValue: PropTypes.number,
};
