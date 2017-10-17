import React, { Component } from 'react';
import { withRouter } from 'react-router';

import NavButtons from './NavButtons';

export default WrappedComponent => {
	class WindowScroll extends Component {
		componentDidUpdate(prevProps) {
			if (this.props.location !== prevProps.location)
				this.component.scrollIntoView();
		}

		render() {
			return (
				<span ref={component => (this.component = component)}>
					<NavButtons />
					<WrappedComponent {...this.props} />
				</span>
			);
		}
	}

	return withRouter(WindowScroll);
};
