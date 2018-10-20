import React from 'react';
import PropTypes from 'prop-types';
import { content } from './RenderProjects.scss';

const RenderProjects = ({
  image,
  title,
  imgtitle,
  description,
  githubLink,
}) => (
  <div className={content}>
    <img src={image.apiURL} alt={image.name} />
    <h2>{title}</h2>
    <h3>{imgtitle}</h3>
    <h4>{description}</h4>
    {githubLink && (
      <a href={githubLink} rel="noopener noreferrer" target="_blank">
        <i className="fa fa-github" />
        view source code
      </a>
    )}
  </div>
);

export default RenderProjects;

RenderProjects.propTypes = {
  image: PropTypes.objectOf(PropTypes.string),
  title: PropTypes.string,
  imgtitle: PropTypes.string,
  description: PropTypes.string,
  githubLink: PropTypes.string,
};
