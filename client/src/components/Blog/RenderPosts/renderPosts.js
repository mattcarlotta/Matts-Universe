import split from 'lodash/split';
import React from 'react';
import PropTypes from 'prop-types';
import { Link, browserHistory } from 'react-router';
import {
  entryContent,
  entryDate,
  entryLink,
  entryImage,
  entryTitle,
  imgTitle,
  postContainer,
} from './renderPosts.scss';

const RenderPosts = ({
  title,
  timestamp,
  image,
  imgtitle,
  description,
  singlePageIsLoaded,
  navTitle,
}) => (
  <div className={postContainer}>
    <h2 className={entryTitle}>{title}</h2>
    <h3 className={entryDate}>{timestamp}</h3>
    {image ? (
      <div className={entryImage}>
        <img src={image.apiURL} alt={image.name} />
      </div>
    ) : null}
    <p className={imgTitle}>
      <em>{imgtitle}</em>
    </p>
    <div className={entryContent}>
      {split(description, '\n').map(postDescription => (
        <p key={title}>
          {postDescription}
          <br />
        </p>
      ))}
    </div>
    {!singlePageIsLoaded && description.length >= 497 ? (
      <div className={entryLink}>
        <Link
          onClick={() =>
            browserHistory.push({
              pathname: `/blog/post/title`,
              query: { postId: `${navTitle}` },
            })
          }
        >
          <i className="fa fa-long-arrow-right" aria-hidden="true" />
          Continue reading
        </Link>
      </div>
    ) : null}
    <hr />
  </div>
);

export default RenderPosts;

RenderPosts.propTypes = {
  title: PropTypes.string,
  timestamp: PropTypes.string,
  image: PropTypes.string,
  imgtitle: PropTypes.string,
  description: PropTypes.string,
  singlePageIsLoaded: PropTypes.bool,
  navTitle: PropTypes.string,
};
