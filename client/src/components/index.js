import React from 'react';
import PropTypes from 'prop-types';
import RenderNotifications from '../containers/App/Notifications/renderNotifications';
import Footer from './Navigation/Footer/footer';
import { wrapper } from './index.scss';

const App = ({ children }) => (
  <div className={wrapper}>
    <RenderNotifications />
    <div style={{ padding: '0 !important' }} className="col-xs-12">
      {children}
    </div>
    <Footer />
  </div>
);

export default App;

App.propTypes = {
  children: PropTypes.node,
};
