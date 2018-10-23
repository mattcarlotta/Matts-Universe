import isEmpty from 'lodash/isEmpty';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NoItemsFound from '../../../components/App/NoItemsFound/noItemsFound';
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
    const { items, style, serverError } = this.props;

    if (!items || isEmpty(items)) {
      if (serverError || requestTimeout) return <NoItemsFound style={style} />;

      return <Spinner />;
    }

    this.clearTimer();

    return null;
  };
}

export default Loader;

Loader.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  style: PropTypes.objectOf(PropTypes.string),
  serverError: PropTypes.string,
};
