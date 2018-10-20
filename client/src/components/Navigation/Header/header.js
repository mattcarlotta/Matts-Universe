import map from 'lodash/map';
import React, { PureComponent } from 'react';
import { Link, browserHistory } from 'react-router';
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
    icon: 'help_outline',
    pathname: '/',
    pixel: 1100,
    title: 'About',
  },
  {
    icon: 'forum',
    pathname: '/blog/page',
    query: { pageId: 1 },
    title: 'Blog',
  },
  {
    icon: 'description',
    pathname: '/',
    pixel: 2120,
    title: 'Projects',
  },
];

class Header extends PureComponent {
  handlePushToLocation = (pathname, query, pixel) => {
    browserHistory.push({ pathname, query });
    window.scrollTo(0, pixel || 0);
  };

  render = () => (
    <nav className={navigationContainer}>
      <ul className={navigationBar}>
        {map(HEADERLINKS, ({ icon, pixel, pathname, query, title }) => (
          <li key={icon}>
            <Link
              onClick={() => this.handlePushToLocation(pathname, query, pixel)}
            >
              <i className={materialIcons}>{icon}</i>
              <span className={headerTitle}>{title}</span>
            </Link>
          </li>
        ))}
        <li>
          <a
            href="http:///www.mattcarlotta.blogspot.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            <i className={materialIcons}>work</i>
            <span className={headerTitle}>Portfolio</span>
          </a>
        </li>
        <SignOut />
      </ul>
    </nav>
  );
}

export default Header;
