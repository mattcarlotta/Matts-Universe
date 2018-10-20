import map from 'lodash/map';
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { uploadedImagesContainer } from './renderPreviewImage.scss';

const PreviewImage = ({
  imageAPIURL,
  imageOriginalName,
  imageSize,
  newImageFiles,
  useStoredImage,
}) => (
  <ul className={uploadedImagesContainer}>
    {useStoredImage ? (
      <Fragment>
        <li>
          <img src={imageAPIURL} alt={imageOriginalName} />
        </li>
        <li>
          {imageOriginalName} - {imageSize} bytes
        </li>
      </Fragment>
    ) : (
      map(newImageFiles, ({ name, preview, size }) => (
        <Fragment key={name}>
          <li>
            <img src={preview} alt={name} />
          </li>
          ,
          <li>
            {name} - {size} bytes
          </li>
        </Fragment>
      ))
    )}
  </ul>
);

export default PreviewImage;

PreviewImage.propTypes = {
  imageOriginalName: PropTypes.string,
  imageSize: PropTypes.number,
  imageAPIURL: PropTypes.string,
  newImageFiles: PropTypes.arrayOf(PropTypes.object),
  useStoredImage: PropTypes.string,
};
