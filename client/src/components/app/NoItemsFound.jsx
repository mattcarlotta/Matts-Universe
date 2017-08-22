import React from 'react';

import AdminPanel from '../../containers/app/AdminPanel';

const NoItemsFound = props => {
	return (
		<div
			className={
				props.message.indexOf('blog') >= 0
					? 'blog-container'
					: 'project-container'
			}>
			<AdminPanel />
			<div data-abide-error className="alert">
				<p>
					<i
						className="fa fa-exclamation-triangle small-icon"
						aria-hidden="true"
					/>
					{props.message}
				</p>
			</div>
		</div>
	);
};

export default NoItemsFound;
