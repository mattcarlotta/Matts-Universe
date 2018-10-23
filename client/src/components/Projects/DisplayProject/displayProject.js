import React from 'react';
import PropTypes from 'prop-types';
import { content, modalContent } from './displayProject.scss';

const DisplayProject = ({
  description,
  githubLink,
  image,
  imgtitle,
  onHandleCancel,
  onHandleClick,
  title,
}) => (
  <div className={`${onHandleClick ? content : modalContent}`}>
    <img
      onClick={onHandleClick}
      onKeyPress={onHandleCancel}
      role="presentation"
      src={image.apiURL}
      style={{ cursor: `${!onHandleClick ? 'auto' : ''}` }}
      alt={image.name}
    />
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

export default DisplayProject;

DisplayProject.propTypes = {
  description: PropTypes.string,
  image: PropTypes.objectOf(PropTypes.string),
  githubLink: PropTypes.string,
  imgtitle: PropTypes.string,
  onHandleClick: PropTypes.func,
  onHandleCancel: PropTypes.func,
  title: PropTypes.string,
};
