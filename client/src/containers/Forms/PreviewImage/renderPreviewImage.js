import map from 'lodash/map';
import React from 'react';
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
    {useStoredImage
      ? [
          <li key="imagefromDB">
            <img src={imageAPIURL} alt={imageOriginalName} />
          </li>,
          <li key="imagefromDBDetails">
            {imageOriginalName} - {imageSize} bytes
          </li>,
        ]
      : map(newImageFiles, ({ name, preview, size }) => [
          <li key="previewImage">
            <img src={preview} alt={name} />
          </li>,
          <li key="previewImageDetails">
            {name} - {size} bytes
          </li>,
        ])}
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
