import React from 'react';
import { Link } from 'react-router';
import notFound from '../../../images/notFound.png';
import { notfoundContainer } from './notFound.scss';

export default () => (
  <div className={notfoundContainer}>
    <Link to="/">
      <img src={notFound} alt="notFound.png" />
    </Link>
  </div>
);
