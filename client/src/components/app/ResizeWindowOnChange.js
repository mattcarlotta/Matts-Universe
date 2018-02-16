import throttle from 'lodash/throttle';
import React, { PureComponent } from 'react';

export default WrappedComponent => (
  class ResizeComponentOnChange extends PureComponent {
    componentWillUnmount = () => window.removeEventListener('resize', this.handleWindowResize);
		componentDidMount = () =>	window.addEventListener('resize', this.handleWindowResize);
    handleWindowResize = throttle(() => this.forceUpdate(), 100);
    render = () => ( <WrappedComponent {...this.props} /> )
  }
);
