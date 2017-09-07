import React from 'react';

const ShowCharactersLeft = (propValue, limitValue) => {
	if (propValue) {
		let postCharactersLeft =
			propValue.length <= limitValue
				? limitValue - propValue.length
				: 'Too many characters!';

		return (
			<p className="characters-left">
				Characters left: {postCharactersLeft}
			</p>
		);
	}
};

export default ShowCharactersLeft;
