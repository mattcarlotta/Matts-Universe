import React from 'react';

import AdminPanel from '../../containers/app/AdminPanel';

export default ({ message }) => (
	<div className={message.indexOf('blog') >= 0 ? 'blog-container error-message' : 'noproject-container error-message'}>
		<AdminPanel />
		<div data-abide-error className="alert">
			<p>
				<i className="fa fa-exclamation-triangle small-icon" aria-hidden="true"/>
				{message}
			</p>
		</div>
	</div>
)
