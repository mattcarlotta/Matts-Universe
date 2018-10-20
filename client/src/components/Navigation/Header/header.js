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
    pixel: -1060,
    title: 'Home',
  },
  {
    icon: 'help_outline',
    pathname: '/',
    pixel: 925,
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
    pixel: 2600,
    title: 'Projects',
  },
];

class Header extends PureComponent {
  handlePushToLocation = (pathname, query) =>
    browserHistory.push({ pathname, query });

  render = () => (
    <nav className={navigationContainer}>
      <ul className={navigationBar}>
        {map(HEADERLINKS, ({ icon, pixel, pathname, query, title }) => (
          <li key={icon}>
            <Link onClick={() => this.handlePushToLocation(pathname, query)}>
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
