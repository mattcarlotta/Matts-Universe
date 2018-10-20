import React, { Fragment } from 'react';

import Home from '../Home/home';
import About from '../About/about';
import ShowProjects from '../Projects/ShowProjects/showProjects';
import Spacer from '../Spacer/spacer';

export default () => (
  <Fragment>
    <Spacer />
    <Home />
    <About />
    <ShowProjects />
  </Fragment>
);
