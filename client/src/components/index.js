import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import RenderNotifications from '../containers/App/Notifications/renderNotifications';
import Footer from './Navigation/Footer/footer';

const App = ({ children }) => (
  <Fragment>
    <RenderNotifications />
    <div style={{ padding: '0 !important' }}>{children}</div>
    <Footer />
  </Fragment>
);

export default App;

App.propTypes = {
  children: PropTypes.node,
};
