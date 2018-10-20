import React from 'react';

import Home from '../Home/home';
import About from '../About/about';
import ShowProjects from '../Projects/ShowProjects/showProjects';

export default () => [
  <Home key="home" />,
  <About key="about" />,
  <ShowProjects key="projects" />,
];
