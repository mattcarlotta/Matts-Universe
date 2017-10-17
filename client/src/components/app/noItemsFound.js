import React from 'react';

import AdminPanel from '../../containers/app/AdminPanel';

const NoItemsFound = ({ message }) => {
	return (
		<div
			className={
				message.indexOf('blog') >= 0 ? 'blog-container' : 'noproject-container'
			}
		>
			<AdminPanel />
			<div data-abide-error className="alert">
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
