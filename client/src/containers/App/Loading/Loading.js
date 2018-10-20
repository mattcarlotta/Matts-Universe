import isEmpty from 'lodash/isEmpty';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NoItemsFound from '../../../components/App/NoItemsFounds/noItemsFound';
import Spinner from '../../../components/Loaders/spinner';

class Loader extends Component {
  state = { requestTimeout: false };

  componentDidMount = () => this.setTimer();

  componentWillUnmount = () => this.clearTimer();

  setTimer = () => (this.timeout = setTimeout(this.timer, 5000));

  clearTimer = () => clearTimeout(this.timeout);

  timer = () => {
    this.clearTimer();
    this.setState({ requestTimeout: true });
  };

  render = () => {
    const { requestTimeout } = this.state;
    const { container, items, message, serverError } = this.props;

    if (!items || isEmpty(items)) {
      if (serverError || requestTimeout)
        return <NoItemsFound message={message} />;

      return <Spinner container={container} />;
    }

    this.clearTimer();

    return null;
  };
}

export default Loading;

Loader.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  container: PropTypes.objectOf(PropTypes.string),
  message: PropTypes.string,
  serverError: PropTypes.string,
};
