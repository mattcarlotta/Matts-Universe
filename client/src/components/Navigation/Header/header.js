import map from 'lodash/map';
import React, { PureComponent } from 'react';
import { Link, browserHistory } from 'react-router';
import { Tooltip } from 'antd';
import SignOut from '../../../containers/Auth/SignOut/signout';
import {
  headerTitle,
  materialIcons,
  navigationContainer,
  navigationBar,
} from './header.scss';

const HEADERLINKS = [
  {
    icon: 'home',
    pathname: '/',
    title: 'Home',
  },
  {
    icon: 'person_pin',
    pathname: '/',
    pixel: 1100,
    title: 'About',
  },
  {
    icon: 'work',
    pathname: '/',
    pixel: 2220,
    title: 'Projects',
  },
];

class Header extends PureComponent {
  componentWillUnmount = () => clearTimeout(this.timeout);

  handlePushToLocation = (pathname, query, pixel) => {
    browserHistory.push({ pathname, query });
    this.timeout = setTimeout(
      () => window.scrollTo({ top: pixel || 0, behavior: 'smooth' }),
      1,
    );
  };

  render = () => (
    <nav className={navigationContainer}>
      <ul className={navigationBar}>
        {map(HEADERLINKS, ({ icon, pixel, pathname, query, title }) => (
          <Tooltip
            key={title}
            arrowPointAtCenter
            placement="bottom"
            trigger="hover"
            title={title}
          >
            <li key={icon}>
              <Link
                onClick={() =>
                  this.handlePushToLocation(pathname, query, pixel)
                }
              >
                <i className={materialIcons}>{icon}</i>
                <span className={headerTitle}>{title}</span>
              </Link>
            </li>
          </Tooltip>
        ))}
        <SignOut />
      </ul>
    </nav>
  );
}

export default Header;
