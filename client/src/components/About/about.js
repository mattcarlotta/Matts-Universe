import React from 'react';
import aboutImage from '../../images/aboutViewImage.png';
import aboutViewImageMobile from '../../images/aboutViewImageMobile.png';
import {
  aboutBG,
  aboutBGColor,
  aboutBody,
  aboutBodyMobile,
  aboutContainer,
  aboutContent,
  aboutImageContainer,
  breakTitle,
  underline,
} from './about.scss';

export default () => (
  <div className={aboutBGColor}>
    <div className={aboutBG} />
    <div className={aboutContainer}>
      <div className={aboutContent}>
        <h1>What I create.</h1>
        <p>
          Melding two passions of commercial illustration with programming in
          several different <br className={breakTitle} /> languages, I develop
          standalone and web applications across multiple platforms.
        </p>
        <div className={underline}>
          <hr />
        </div>
        <div className={aboutBodyMobile}>
          <img src={aboutViewImageMobile} alt="aboutViewImageMobile.png" />
        </div>
        <div className={aboutBody}>
          <div className={aboutImageContainer}>
            <img src={aboutImage} alt="aboutImage.png" />
          </div>
        </div>
      </div>
    </div>
  </div>
);
