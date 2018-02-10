import debounce from 'lodash/debounce';
import React, { PureComponent } from 'react';

export default WrappedComponent => {
  return class ResizeComponentOnChange extends PureComponent {
    componentWillUnmount = () => window.removeEventListener('resize', this.handleWindowResize);
		componentDidMount = () =>	window.addEventListener('resize', this.handleWindowResize);
    handleWindowResize = debounce(() => this.forceUpdate(), 100);
    render = () => ( <WrappedComponent {...this.props} /> )
  }
}
