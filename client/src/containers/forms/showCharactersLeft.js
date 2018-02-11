import React from 'react';

export default (propValue, limitValue) => {
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
