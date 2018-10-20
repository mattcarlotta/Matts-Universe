import React from 'react';
import Projects from '../../../containers/Projects/GetProjects/GetProjects';
import { projectContainer, projectContent, title } from './showProjects.scss';

export default () => (
  <div className={projectContainer}>
    <div className={title}>
      <h1>What I've developed.</h1>
      <p>
        A slideshow of projects I've created starting with the most recent and
        going as far back as late 2016.
      </p>
    </div>
    <div className={projectContent}>
      <Projects />
    </div>
  </div>
);
