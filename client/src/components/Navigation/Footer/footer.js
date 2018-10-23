import map from 'lodash/map';
import React from 'react';
import { contactNav, footerContainer, footerTitle } from './footer.scss';

const FOOTERLINKS = [
  {
    icon: 'fa-envelope',
    title: 'carlotta.matt@gmail.com',
  },
  {
    icon: 'fa-github',
    link: 'https://github.com/mattcarlotta',
    title: 'My Github',
  },
  {
    icon: 'fa-linkedin-square',
    link: 'https://www.linkedin.com/in/mattcarlotta/',
    title: 'My Linkedin',
  },
];

export default () => (
  <div className={footerContainer}>
    <ul className={contactNav}>
      <li>
        <p>©2018 Matt Carlotta</p>
      </li>
      {map(FOOTERLINKS, ({ icon, link, title }) => (
        <li key={title}>
          <a href={link} rel="noopener noreferrer" target="_blank">
            <i
              className={`fa ${icon}`}
              rel="noopener noreferrer"
              target="_blank"
            />
            <span className={footerTitle}>{title}</span>
          </a>
        </li>
      ))}
    </ul>
  </div>
);
